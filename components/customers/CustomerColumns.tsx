"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CustomerType>[] = [
  {
    accessorKey: "clerkId",
    header: "Clerk ID",
  },
  {
    accessorKey: "name",
    header: "Tên khách hàng",
  },
  {
    accessorKey: "email",
    header: "Địa chỉ Email",
  },
];
