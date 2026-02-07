"use client";

/**
 * REVENUE CARD COMPONENT
 *
 * Goal: Answer "How much money am I making?" and "Am I getting sales?"
 *
 * Displays the seller's total revenue and order count prominently.
 * This is the first thing a seller looks at on their dashboard.
 */

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSellerRevenueSummary, type RevenueSummary } from "@/actions/(seller)/dashboard/revenue";
import { IndianRupee, ShoppingBag } from "lucide-react";

export function RevenueCard() {
    const [data, setData] = useState<RevenueSummary | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await getSellerRevenueSummary();
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <RevenueCardSkeleton />;
    }

    if (!data) {
        return (
            <Card className="col-span-2">
                <CardContent className="pt-6">
                    <p className="text-muted-foreground text-center">
                        Unable to load revenue data
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {/* Total Revenue Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Revenue
                    </CardTitle>
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ₹{data.totalRevenue.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        All-time earnings
                    </p>
                </CardContent>
            </Card>

            {/* Total Orders Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Orders
                    </CardTitle>
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {data.totalOrders.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Orders received
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

function RevenueCardSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-32 mb-1" />
                    <Skeleton className="h-3 w-20" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-8 w-20 mb-1" />
                    <Skeleton className="h-3 w-20" />
                </CardContent>
            </Card>
        </div>
    );
}
