"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

// Format date to 'dd/mm/yyyy'
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // 'en-GB' is for 'dd/mm/yyyy' format
};

export const columns: ColumnDef<EmployeeType>[] = [
  {
    accessorKey: "fullName",
    header: "Họ tên",
    cell: ({ row }) => {
      const { firstName, lastName, _id } = row.original;
      return (
        <Link href={`/employees/${_id}`} className="hover:text-red-1">
          {firstName} {lastName}
        </Link>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Địa chỉ Email",
  },
  {
    accessorKey: "dob",
    header: "Ngày sinh",
    cell: ({ row }) => <span>{formatDate(row.original.dob)}</span>,
  },
  {
    accessorKey: "joinDate",
    header: "Ngày vào làm",
    cell: ({ row }) => <span>{formatDate(row.original.joinDate)}</span>,
  },
  {
    accessorKey: "salary",
    header: "Lương (VND)",
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="employee" id={row.original._id} />,
  },
];
