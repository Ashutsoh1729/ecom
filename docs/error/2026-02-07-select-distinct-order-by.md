# RCA: SELECT DISTINCT ORDER BY Error in Seller Dashboard

**Date**: 2026-02-07  
**Error Code**: PostgreSQL 42P10  
**Affected Route**: `/dashboard`

## Error Message

```
for SELECT DISTINCT, ORDER BY expressions must appear in select list
```

## Failing Query

```sql
SELECT DISTINCT "order_items"."order_id" 
FROM "order_items" 
INNER JOIN "orders" ON "orders"."id" = "order_items"."order_id" 
WHERE "order_items"."product_id" IN ($1, $2) 
ORDER BY "orders"."order_date" DESC 
LIMIT $3
```

## Root Cause

PostgreSQL requires that when using `SELECT DISTINCT`, any column in the `ORDER BY` clause must also appear in the `SELECT` list.

We were:
- Selecting: `order_items.order_id`
- Ordering by: `orders.order_date` ← **Not in SELECT list**

## Code Location

`src/actions/(seller)/dashboard/revenue.ts` → `getRecentOrders()`

```typescript
// BROKEN: selectDistinct with ORDER BY on non-selected column
const orderIdsResult = await db
    .selectDistinct({ orderId: orderItems.orderId })
    .from(orderItems)
    .innerJoin(orders, eq(orders.id, orderItems.orderId))
    .where(inArray(orderItems.productId, productIds))
    .orderBy(desc(orders.orderDate))  // ❌ Not in SELECT
    .limit(limit);
```

## Fix Applied

Replaced SQL-builder approach with Drizzle's relational query API:

```typescript
// FIXED: Use relational queries - Drizzle handles the SQL correctly
const recentOrders = await db.query.orders.findMany({
    with: {
        items: {
            with: { products: true, variants: true },
            where: inArray(orderItems.productId, productIds),
        },
    },
    orderBy: [desc(orders.orderDate)],
    limit,
});
```

## Why Relational Queries Are Better

| Aspect | SQL Builder | Relational Query |
|--------|-------------|------------------|
| DISTINCT + ORDER BY | Manual handling required | Drizzle handles internally |
| Type Safety | Good | Excellent (nested types auto-inferred) |
| Joins | Manual with `innerJoin()` | Automatic via `with: {}` |

## Prevention

- Prefer `db.query.*` over `db.select()` for complex queries with joins
- When using `selectDistinct`, ensure ORDER BY columns are in SELECT
- Test queries with actual data before deployment
