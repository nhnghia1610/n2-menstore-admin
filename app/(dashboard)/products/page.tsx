"use client";


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import Loader from "@/components/custom ui/Loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/products/ProductColumns";
import toast from "react-hot-toast";

const Products = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();  

    if (localStorage.getItem("showSuccessToast") === "true") {
      toast.success("Product created/updated successfully!");
      
      localStorage.removeItem("showSuccessToast");
    }

  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Quản lý sản phẩm</p>
        <Button
          className="bg-[#FDAB04] text-black"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
