"use server";

/**
 * =============================================================================
 * SELLER DASHBOARD - REVENUE SERVER ACTIONS (MVP)
 * =============================================================================
 *
 * These server actions provide the core revenue/sales data for sellers.
 *
 * MVP Must-Have Features (see docs/plan/seller-dashboard-revenue.md):
 * ✅ Total Revenue     - "How much money am I making?"
 * ✅ Total Orders      - "Am I getting sales?"
 * ✅ Top Products      - "What's selling well?"
 * ✅ Recent Orders     - "What orders need attention?"
 *
 * =============================================================================
 */

import { auth } from "@/auth";
import { db } from "@/db/client";
import {
    sellers,
    stores,
    products,
    orderItems,
    orders,
    productVariants,
} from "@/db/schema";
import { eq, sql, inArray, desc, and } from "drizzle-orm";

// =============================================================================
// TYPES
// =============================================================================

/**
 * Revenue summary for the seller dashboard
 * Goal: Answer "How much money am I making?" and "Am I getting sales?"
 */
export interface RevenueSummary {
    totalRevenue: number;   // Total money earned (₹)
    totalOrders: number;    // Number of orders received
}

/**
 * Top selling product information
 * Goal: Answer "What's selling well?"
 */
export interface TopProduct {
    productId: string;
    productName: string;
    totalQuantity: number;  // Units sold
    totalRevenue: number;   // Money earned from this product
}

/**
 * Individual item in a recent order
 */
export interface RecentOrderItem {
    productName: string;
    variantName: string;
    quantity: number;
    priceAtOrder: number;
}

/**
 * Recent order information
 * Goal: Answer "What orders need attention?"
 */
export interface RecentOrder {
    orderId: string;
    orderDate: Date;
    status: string;
    items: RecentOrderItem[];
    orderTotal: number;     // Total for seller's items only
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Get all store IDs owned by the authenticated seller
 */
async function getSellerStoreIds(userId: string): Promise<string[]> {
    const seller = await db.query.sellers.findFirst({
        where: eq(sellers.userId, userId),
    });

    if (!seller) {
        return [];
    }

    const sellerStores = await db
        .select({ id: stores.id })
        .from(stores)
        .where(eq(stores.sellerId, seller.id));

    return sellerStores.map((store) => store.id);
}

/**
 * Get all product IDs belonging to the seller's stores
 */
async function getSellerProductIds(storeIds: string[]): Promise<string[]> {
    if (storeIds.length === 0) return [];

    const sellerProducts = await db
        .select({ id: products.id })
        .from(products)
        .where(inArray(products.storeId, storeIds));

    return sellerProducts.map((product) => product.id);
}

/**
 * Authenticate and get seller's store IDs
 * Returns null if user is not authenticated or not a seller
 */
async function authenticateAndGetStoreIds(): Promise<{
    userId: string;
    storeIds: string[];
} | null> {
    const session = await auth();
    if (!session?.user?.id) {
        return null;
    }

    const storeIds = await getSellerStoreIds(session.user.id);
    return { userId: session.user.id, storeIds };
}

// =============================================================================
// SERVER ACTIONS - MVP
// =============================================================================

/**
 * GET SELLER REVENUE SUMMARY
 * 
 * Goal: "How much money am I making?" + "Am I getting sales?"
 * 
 * This is the primary metric sellers care about. Shows:
 * - Total revenue earned (all-time)
 * - Total number of orders received
 * 
 * Sellers won't trust a platform that can't show them their earnings.
 */
export async function getSellerRevenueSummary(): Promise<RevenueSummary | null> {
    const authResult = await authenticateAndGetStoreIds();
    if (!authResult) return null;

    const { storeIds } = authResult;

    // New seller with no stores yet
    if (storeIds.length === 0) {
        return { totalRevenue: 0, totalOrders: 0 };
    }

    const productIds = await getSellerProductIds(storeIds);

    // Seller has stores but no products yet
    if (productIds.length === 0) {
        return { totalRevenue: 0, totalOrders: 0 };
    }

    // Aggregate revenue from order items for seller's products
    const result = await db
        .select({
            totalRevenue: sql<number>`COALESCE(SUM(${orderItems.priceAtOrder} * ${orderItems.quantity}), 0)`,
            totalOrders: sql<number>`COUNT(DISTINCT ${orderItems.orderId})`,
        })
        .from(orderItems)
        .where(inArray(orderItems.productId, productIds));

    const data = result[0];

    return {
        totalRevenue: Number(data.totalRevenue) || 0,
        totalOrders: Number(data.totalOrders) || 0,
    };
}

/**
 * GET TOP SELLING PRODUCTS
 * 
 * Goal: "What's selling well?"
 * 
 * Helps sellers understand which products are driving their business.
 * This insight helps with:
 * - Inventory decisions (stock more of what sells)
 * - Marketing focus (promote winners)
 * - Product strategy (create similar products)
 */
export async function getTopSellingProducts(
    limit: number = 5
): Promise<TopProduct[]> {
    const authResult = await authenticateAndGetStoreIds();
    if (!authResult) return [];

    const { storeIds } = authResult;
    if (storeIds.length === 0) return [];

    const productIds = await getSellerProductIds(storeIds);
    if (productIds.length === 0) return [];

    const result = await db
        .select({
            productId: products.id,
            productName: products.name,
            totalQuantity: sql<number>`COALESCE(SUM(${orderItems.quantity}), 0)`,
            totalRevenue: sql<number>`COALESCE(SUM(${orderItems.priceAtOrder} * ${orderItems.quantity}), 0)`,
        })
        .from(orderItems)
        .innerJoin(products, eq(products.id, orderItems.productId))
        .where(inArray(orderItems.productId, productIds))
        .groupBy(products.id, products.name)
        .orderBy(
            desc(sql`COALESCE(SUM(${orderItems.priceAtOrder} * ${orderItems.quantity}), 0)`)
        )
        .limit(limit);

    return result.map((row) => ({
        productId: row.productId,
        productName: row.productName,
        totalQuantity: Number(row.totalQuantity) || 0,
        totalRevenue: Number(row.totalRevenue) || 0,
    }));
}

/**
 * GET RECENT ORDERS
 * 
 * Goal: "What orders need attention?"
 * 
 * Sellers need to see recent activity to:
 * - Track new orders that need fulfillment
 * - Monitor order statuses
 * - Feel connected to their business activity
 * 
 * Only shows items from the seller's products (not the entire order).
 * 
 * NOTE: Uses Drizzle relational queries to avoid PostgreSQL 
 * "SELECT DISTINCT ORDER BY" issues (error 42P10).
 * See: docs/error/2026-02-07-select-distinct-order-by.md
 */
export async function getRecentOrders(
    limit: number = 10
): Promise<RecentOrder[]> {
    const authResult = await authenticateAndGetStoreIds();
    if (!authResult) return [];

    const { storeIds } = authResult;
    if (storeIds.length === 0) return [];

    const productIds = await getSellerProductIds(storeIds);
    if (productIds.length === 0) return [];

    // Use Drizzle relational query API - it handles the SQL correctly
    const recentOrders = await db.query.orders.findMany({
        with: {
            items: {
                with: {
                    products: true,
                },
            },
        },
        orderBy: [desc(orders.orderDate)],
        limit: limit * 2, // Fetch extra since we'll filter by seller's products
    });

    // Filter and transform orders to only include seller's products
    const result: RecentOrder[] = [];

    for (const order of recentOrders) {
        // Filter items to only seller's products
        const sellerItems = order.items.filter(item =>
            productIds.includes(item.productId)
        );

        if (sellerItems.length === 0) continue;

        // Fetch variant names for the seller's items
        const variantIds = sellerItems.map(item => item.variantId);
        const variants = await db
            .select({ id: productVariants.id, name: productVariants.name })
            .from(productVariants)
            .where(inArray(productVariants.id, variantIds));

        const variantMap = new Map(variants.map(v => [v.id, v.name]));

        const items: RecentOrderItem[] = sellerItems.map(item => ({
            productName: item.products?.name || "Unknown Product",
            variantName: variantMap.get(item.variantId) || "Unknown Variant",
            quantity: item.quantity,
            priceAtOrder: Number(item.priceAtOrder),
        }));

        const orderTotal = items.reduce(
            (sum, item) => sum + item.priceAtOrder * item.quantity,
            0
        );

        result.push({
            orderId: order.id,
            orderDate: order.orderDate,
            status: order.status,
            items,
            orderTotal,
        });

        if (result.length >= limit) break;
    }

    return result;
}
