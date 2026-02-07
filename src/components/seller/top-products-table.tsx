"use client";

/**
 * TOP PRODUCTS TABLE COMPONENT
 *
 * Goal: Answer "What's selling well?"
 *
 * Displays the seller's best-performing products ranked by revenue.
 * Helps sellers understand which products are driving their business.
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
import { Skeleton } from "@/components/ui/skeleton";
import { getTopSellingProducts, type TopProduct } from "@/actions/(seller)/dashboard/revenue";
import { Trophy } from "lucide-react";

interface TopProductsTableProps {
    limit?: number;
}

export function TopProductsTable({ limit = 5 }: TopProductsTableProps) {
    const [products, setProducts] = useState<TopProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await getTopSellingProducts(limit);
            setProducts(result);
            setLoading(false);
        }
        fetchData();
    }, [limit]);

    if (loading) {
        return <TopProductsTableSkeleton />;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <CardTitle>Top Selling Products</CardTitle>
                </div>
                <CardDescription>
                    Your best-performing products by revenue
                </CardDescription>
            </CardHeader>
            <CardContent>
                {products.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                        No sales yet. Your top products will appear here.
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-12">#</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Sold</TableHead>
                                <TableHead className="text-right">Revenue</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={product.productId}>
                                    <TableCell className="font-medium">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.productName}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {product.totalQuantity.toLocaleString("en-IN")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        ₹{product.totalRevenue.toLocaleString("en-IN")}
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

function TopProductsTableSkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <Skeleton className="h-4 w-6" />
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <div className="flex gap-8">
                                <Skeleton className="h-4 w-12" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
