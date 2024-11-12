"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/employees/EmployeeColumns";
import toast from "react-hot-toast";

const Employees = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<EmployeeType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/employees", {
        method: "GET",
      });
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.log("[pemployees_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();  
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Quản lý nhân viên</p>
        <Button
          className="bg-[#FDAB04] text-black"
          onClick={() => router.push("/employees/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm nhân viên mới
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={employees} searchKey="email" />
    </div>
  );
};

export default Employees;
