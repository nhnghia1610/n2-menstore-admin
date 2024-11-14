"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "../custom ui/Loader";

const formSchema = z.object({
    username: z.string().min(2).max(20),
    password: z.string().min(2).max(20).optional(),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    email: z.string().min(2).max(30),
    dob: z.date(),
    joinDate: z.date(),
    salary: z.coerce.number().min(0.1),
});

interface EmployeeFormProps {
    initialData?: EmployeeType | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    console.log("initial data", initialData);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
            ? {
                  ...initialData,
                  dob: new Date(initialData.dob),
                  joinDate: new Date(initialData.joinDate),
              }
            : {
                  username: "",
                  firstName: "",
                  lastName: "",
                  email: "",
                  dob: new Date(),
                  joinDate: new Date(),
                  salary: 0.1,
              },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
    
            const employeeData = initialData ? {
                ...values,
                password: undefined,
            } : values;
    
            const url = initialData
                ? `/api/employees/${initialData._id}`
                : "/api/employees";
            
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employeeData),
            });
    
            if (res.ok) {
                setLoading(false);
                toast.success(`${initialData ? "Cập nhật" : "Tạo"} nhân viên thành công`);
                router.push("/employees");
            }
        } catch (err) {
            console.log("[employee_POST]", err);
            toast.error("Something went wrong! Please try again.");
            setLoading(false);
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="p-10">
            {initialData ? (
                <div className="flex items-center justify-between">
                    <p className="text-heading2-bold">Sửa nhân viên</p>
                </div>
            ) : (
                <p className="text-heading2-bold">Thêm nhân viên mới</p>
            )}
            <Separator className="bg-grey-1 mt-4 mb-7" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên tài khoản</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên tài khoản của nhân viên" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    {!initialData && (
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Mật khẩu mặc định của nhân viên"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                    )}
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ</FormLabel>
                                <FormControl>
                                    <Input placeholder="Họ nhân viên" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tên nhân viên" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Địa chỉ Email nhân viên" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg mb-2 mr-9">Ngày sinh</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        selected={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(date)}
                                        placeholderText="Nhập ngày sinh"
                                        dateFormat="dd-MM-yyyy"
                                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm placeholder-gray-400"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="joinDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold mb-2 mr-9">Ngày vào làm</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        selected={field.value || null}
                                        onChange={(date) => field.onChange(date)}
                                        placeholderText="Nhập ngày vào làm"
                                        dateFormat="dd-MM-yyyy"
                                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm placeholder-gray-400"
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Lương</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Nhập lương" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-10">
                        <Button type="submit" className="bg-[#FDAB04] text-black">
                            Lưu
                        </Button>
                        <Button
                            type="button"
                            onClick={() => router.push("/employees")}
                            className="bg-[#1F2937] text-white"
                        >
                            Hủy
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default EmployeeForm;
