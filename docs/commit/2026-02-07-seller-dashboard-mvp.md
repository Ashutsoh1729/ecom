# 2026-02-07: Seller Dashboard MVP Implementation

## Summary
Implemented MVP seller dashboard with revenue tracking, modernized store and product tables.

## Key Changes

### 1. Seller Dashboard Planning
- Added "Understanding the Seller" section to `docs/plan/seller-dashboard-revenue.md`
- Defined MVP priorities: Total Revenue, Total Orders, Top Products, Recent Orders
- Deferred post-MVP features: charts, trends, AOV, exports

### 2. Revenue Server Actions (`src/actions/(seller)/dashboard/revenue.ts`)
- Rewrote to focus on MVP-only features
- Functions: `getSellerRevenueSummary()`, `getTopSellingProducts()`, `getRecentOrders()`
- Each function has goal-oriented comments explaining the seller question it answers

### 3. Dashboard Components (`src/components/seller/`)
- `RevenueCard` - Total revenue + orders display
- `TopProductsTable` - Best-selling products ranked by revenue
- `RecentOrdersList` - Latest orders with status badges
- All include loading skeletons and empty states

### 4. Bug Fix: PostgreSQL SELECT DISTINCT + ORDER BY
- **Error**: `42P10` - ORDER BY column must be in SELECT list when using DISTINCT
- **Fix**: Replaced `selectDistinct` with Drizzle relational queries (`db.query.orders.findMany`)
- **RCA**: `docs/error/2026-02-07-select-distinct-order-by.md`

### 5. Modernized Store Table (`src/app/(seller)/dashboard/stores/`)
- Stats cards: Total, Active, Inactive stores
- Store icon with name + ID
- Status badge + visibility toggle switch
- Improved actions dropdown

### 6. Modernized Product Table (`src/app/(seller)/dashboard/products/`)
- Stats cards: Total, Active, Draft, Total Stock
- Product thumbnail with fallback icon
- Variant count, store badge, status badges
- Price range formatting, stock warnings (Low/Out of stock)
- Row click navigates to product detail

## Files Created/Modified
```
src/actions/(seller)/dashboard/revenue.ts  [MODIFIED]
src/components/seller/index.ts            [NEW]
src/components/seller/revenue-card.tsx    [NEW]
src/components/seller/top-products-table.tsx [NEW]
src/components/seller/recent-orders-list.tsx [NEW]
src/app/(seller)/dashboard/(root)/components/sections.tsx [MODIFIED]
src/app/(seller)/dashboard/stores/components/sections.tsx [MODIFIED]
src/app/(seller)/dashboard/stores/components/store-table.tsx [MODIFIED]
src/app/(seller)/dashboard/stores/components/store-columns.tsx [NEW]
src/app/(seller)/dashboard/products/components/product-sections.tsx [MODIFIED]
src/app/(seller)/dashboard/products/components/product-table.tsx [MODIFIED]
src/app/(seller)/dashboard/products/components/product-columns.tsx [NEW]
docs/plan/seller-dashboard-revenue.md     [MODIFIED]
docs/error/2026-02-07-select-distinct-order-by.md [NEW]
```

## Design Decisions
- Used Drizzle relational queries over SQL builder for complex joins
- Separated column definitions into dedicated files for reusability
- Stats cards provide at-a-glance metrics before table details
- Consistent card-wrapped table pattern across dashboard pages
