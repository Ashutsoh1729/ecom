"use client";

/**
 * RECENT ORDERS LIST COMPONENT
 *
 * Goal: Answer "What orders need attention?"
 *
 * Displays recent orders containing the seller's products.
 * Helps sellers track new orders and manage fulfillment.
 */

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentOrders, type RecentOrder } from "@/actions/(seller)/dashboard/revenue";
import { Clock } from "lucide-react";

interface RecentOrdersListProps {
    limit?: number;
}

export function RecentOrdersList({ limit = 10 }: RecentOrdersListProps) {
    const [orders, setOrders] = useState<RecentOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await getRecentOrders(limit);
            setOrders(result);
            setLoading(false);
        }
        fetchData();
    }, [limit]);

    if (loading) {
        return <RecentOrdersListSkeleton />;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <CardTitle>Recent Orders</CardTitle>
                </div>
                <CardDescription>
                    Latest orders containing your products
                </CardDescription>
            </CardHeader>
            <CardContent>
                {orders.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                        No orders yet. Your recent orders will appear here.
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell className="font-mono text-xs">
                                        {order.orderId.slice(0, 8)}...
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(order.orderDate)}
                                    </TableCell>
                                    <TableCell>
                                        <OrderItemsSummary items={order.items} />
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge status={order.status} />
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        ₹{order.orderTotal.toLocaleString("en-IN")}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

function OrderItemsSummary({ items }: { items: RecentOrder["items"] }) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const firstItem = items[0];

    if (items.length === 1) {
        return (
            <span title={`${firstItem.productName} (${firstItem.variantName})`}>
                {firstItem.productName.length > 25
                    ? `${firstItem.productName.slice(0, 25)}...`
                    : firstItem.productName}
                {" "}×{firstItem.quantity}
            </span>
        );
    }

    return (
        <span title={items.map(i => `${i.productName} ×${i.quantity}`).join(", ")}>
            {totalItems} items ({items.length} products)
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const statusConfig: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
        pending: { variant: "outline", label: "Pending" },
        processing: { variant: "secondary", label: "Processing" },
        shipped: { variant: "default", label: "Shipped" },
        delivered: { variant: "default", label: "Delivered" },
        cancelled: { variant: "destructive", label: "Cancelled" },
    };

    const config = statusConfig[status.toLowerCase()] || { variant: "outline" as const, label: status };

    return <Badge variant={config.variant}>{config.label}</Badge>;
}

function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
}

function RecentOrdersListSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <div className="flex gap-4 items-center">
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
