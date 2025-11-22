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
  slug: string;
  mainImg: string;
  storeName: string;
  status: "draft" | "active" | "archived";
  price: string;
  quantity: string;
};

// Tanstack-Table column
export const getProductColumns = (
  onDelete: (productId: string, productName: string) => void,
): ColumnDef<productTableColumn>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "storeName",
    header: () => <div className="text-center">Store Name</div>,
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-center">{product.storeName}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-center">{product.status}</div>;
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-center">{product.price}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Quantity</div>,
    cell: ({ row }) => {
      const product = row.original;
      return <div className="text-center">{product.quantity}</div>;
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Edit</div>,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="text-center">
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
                Copy Product Name
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
        </div>
      );
    },
  },
];

export type storeColumn = {
  id: string;
  name: string;
  isActive: boolean;
};

export const StoreColumns = ({
  onDelete,
  changeActive,
}: {
  onDelete: (storeId: string, storeName: string) => void;
  changeActive: (storeId: string, storeName: string) => void;
}): ColumnDef<storeColumn>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Active</div>,
    cell: ({ row }) => {
      const store = row.original;

      async function handleSwitchChange() {
        changeActive(store.id, store.name);
      }

      return (
        <div className="text-center">
          <Switch
            checked={store.isActive}
            onCheckedChange={handleSwitchChange}
          />
        </div>
      );
    },
  },
  // You would also want a column to use your 'onDelete' function
  {
    id: "actions", // A unique ID for a column that doesn't have an accessorKey
    header: () => <div className="text-right pr-[40px]">Edit</div>,
    cell: ({ row }) => {
      const store = row.original; // Get the full store object for this row

      return (
        // This is where you would place your UI, like a dropdown menu with a "Delete" button

        // FIX: Error, The padding is not working, while it should work. Find out and resolve it

        <div className="text-right pr-[40px]">
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
                Copy Store Name
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
        </div>
      );
    },
  },
];
