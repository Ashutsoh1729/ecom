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
import { StoreTableDataInterface } from "@/lib/logic";

const StoreTable = ({
  storeDataList,
}: {
  storeDataList: StoreTableDataInterface[];
}) => {
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
          {storeDataList.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.storeName}</TableCell>
                <TableCell className="">
                  <Switch id="is-store-active" checked={item.isActive} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StoreTable;
