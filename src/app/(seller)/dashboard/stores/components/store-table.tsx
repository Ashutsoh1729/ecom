"use client";

import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useAllStoresDataList,
  useStoreList,
} from "../../(root)/context/store-context";
import { Ellipsis, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const StoreTable = () => {
  // const storesList = useStoreList();

  const allStoreData = useAllStoresDataList();
  // console.log(allStoreData);
  /* 
  if (storesList === null) {
    return;
  } */
  if (allStoreData === null) {
    return;
  }

  async function handleDeleteStore() {
    console.log("You want to delete store.");
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store Name</TableHead>
            <TableHead>Active</TableHead>
            {/* <TableHead>Store Name</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allStoreData.map((item) => {
            return (
              <TableRow key={item.slug}>
                <TableCell className="font-medium">{item.storeName}</TableCell>
                <TableCell className="">
                  <Switch id="is-store-active" checked={item.isActive} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 border border-slate-300 hover:cursor-pointer rounded">
                        <Ellipsis size={15} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Activate</DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={handleDeleteStore}
                      >
                        <Trash className="hover:!bg-red-600" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

interface StoreTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const StoreTable_2 = <TData, TValue>({
  columns,
  data,
}: StoreTableProps<TData, TValue>) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreTable;
export { StoreTable_2 };
