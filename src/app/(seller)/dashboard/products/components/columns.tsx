import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";

export type productTableColumn = {
  id: string;
  name: string;
  storeName: string;
  status: "draft" | "active" | "archived";
  price: string;
  quantity: string;
};

export const getProductColumns = (
  onDelete: (productId: string, productName: string) => void,
): ColumnDef<productTableColumn>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "storeName",
    header: () => <div className="text-right">Store Name</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantity</div>,
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(product.name)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(product.id, product.name)}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export type storeColumn = {
  id: string;
  name: string;
  isActive: boolean;
};

export const StoreColumns = (
  onDelete: (storeId: string, storeName: string) => void,
  changeActive: (storeId: string) => void,
): ColumnDef<storeColumn>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const store = row.original;

      return (
        <div>
          <Switch checked={store.isActive} />
        </div>
      );
    },
  },
  // You would also want a column to use your 'onDelete' function
  {
    id: "actions", // A unique ID for a column that doesn't have an accessorKey
    header: "Actions",
    cell: ({ row }) => {
      const store = row.original; // Get the full store object for this row

      return (
        // This is where you would place your UI, like a dropdown menu with a "Delete" button
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(store.name)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => onDelete(store.id, store.name)}
            >
              <Trash /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
