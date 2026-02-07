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
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Copy, Store } from "lucide-react";

export type StoreColumn = {
    id: string;
    name: string;
    isActive: boolean;
};

export const getModernStoreColumns = ({
    onDelete,
    changeActive,
}: {
    onDelete: (storeId: string, storeName: string) => void;
    changeActive: (storeId: string, storeName: string) => void;
}): ColumnDef<StoreColumn>[] => [
        {
            accessorKey: "name",
            header: "Store Name",
            cell: ({ row }) => {
                const store = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                            <Store className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="font-medium">{store.name}</div>
                            <div className="text-xs text-muted-foreground">
                                ID: {store.id.slice(0, 8)}...
                            </div>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "isActive",
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const store = row.original;

                return (
                    <div className="flex items-center justify-center gap-3">
                        <Badge
                            variant={store.isActive ? "default" : "secondary"}
                            className={store.isActive
                                ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                                : ""
                            }
                        >
                            {store.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>
                );
            },
        },
        {
            id: "toggle",
            header: () => <div className="text-center">Visibility</div>,
            cell: ({ row }) => {
                const store = row.original;

                return (
                    <div className="flex items-center justify-center">
                        <Switch
                            checked={store.isActive}
                            onCheckedChange={() => changeActive(store.id, store.name)}
                            className="data-[state=checked]:bg-green-500"
                        />
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const store = row.original;

                return (
                    <div className="flex justify-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-muted"
                                >
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(store.name)}
                                    className="gap-2"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copy Store Name
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(store.id)}
                                    className="gap-2"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copy Store ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => onDelete(store.id, store.name)}
                                    className="gap-2"
                                >
                                    <Trash className="h-4 w-4" />
                                    Delete Store
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                );
            },
        },
    ];
