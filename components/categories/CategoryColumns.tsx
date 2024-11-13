"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<CategoryType>[] = [
  {
    accessorKey: "title",
    header: "Tên danh mục",
    cell: ({ row }) => (
      <Link
        href={`/categories/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Số lượng sản phẩm",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="category" id={row.original._id} />,
  },
];
