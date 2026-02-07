"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Copy, ExternalLink, Package } from "lucide-react";
import Image from "next/image";

export type ProductTableColumn = {
    id: string;
    name: string;
    slug: string;
    mainImg: string;
    storeName: string;
    status: "draft" | "active" | "archived";
    price: string;
    quantity: number;
    variantCount: number;
};

const statusConfig = {
    active: {
        label: "Active",
        className: "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400",
    },
    draft: {
        label: "Draft",
        className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    archived: {
        label: "Archived",
        className: "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
    },
};

export const getModernProductColumns = (
    onDelete: (productId: string, productName: string) => void
): ColumnDef<ProductTableColumn>[] => [
        {
            accessorKey: "name",
            header: "Product",
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {product.mainImg ? (
                                <Image
                                    src={product.mainImg}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <Package className="h-5 w-5 text-muted-foreground" />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0">
                            <div className="font-medium truncate max-w-[200px]" title={product.name}>
                                {product.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {product.variantCount} variant{product.variantCount !== 1 ? "s" : ""}
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "storeName",
            header: "Store",
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="text-sm">
                        <Badge variant="outline" className="font-normal">
                            {product.storeName}
                        </Badge>
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const product = row.original;
                const config = statusConfig[product.status];
                return (
                    <div className="flex justify-center">
                        <Badge className={config.className}>{config.label}</Badge>
                    </div>
                );
            },
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div className="text-right font-medium">
                        {product.price}
                    </div>
                );
            },
        },
        {
            accessorKey: "quantity",
            header: () => <div className="text-right">Stock</div>,
            cell: ({ row }) => {
                const product = row.original;
                const isLowStock = product.quantity <= 5 && product.quantity > 0;
                const isOutOfStock = product.quantity === 0;

                return (
                    <div className="text-right">
                        <span
                            className={
                                isOutOfStock
                                    ? "text-red-600 font-medium"
                                    : isLowStock
                                        ? "text-yellow-600 font-medium"
                                        : ""
                            }
                        >
                            {isOutOfStock ? "Out of stock" : product.quantity.toLocaleString("en-IN")}
                        </span>
                        {isLowStock && !isOutOfStock && (
                            <div className="text-xs text-yellow-600">Low stock</div>
                        )}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const product = row.original;

                return (
                    <div className="flex justify-end" data-no-navigate>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-muted"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(`/products/${product.slug}`, "_blank");
                                    }}
                                    className="gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    View Product Page
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigator.clipboard.writeText(product.name);
                                    }}
                                    className="gap-2"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copy Name
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(product.id, product.name);
                                    }}
                                    className="gap-2"
                                >
                                    <Trash className="h-4 w-4" />
                                    Delete Product
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];
