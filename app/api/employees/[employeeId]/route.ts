import Collection from "@/lib/models/Collection";
import Employee from "@/lib/models/Employee";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) => {
  try {
    await connectToDB();

    // Find employee by ID
    const employee = await Employee.findById(params.employeeId);

    if (!employee) {
      return new NextResponse(JSON.stringify({ message: "Employee not found" }), { status: 404 });
    }

    // Convert salary from Decimal128 to a regular number
    const salary = employee.salary instanceof mongoose.Schema.Types.Decimal128
      ? parseFloat(employee.salary.toString()) // Convert Decimal128 to number
      : employee.salary;

    // Fetch the Clerk user details using the clerkId from the employee document
    const clerkUser = await clerkClient.users.getUser(employee.clerkId);

    // Construct the response with both employee and Clerk username details
    const employeeWithUserName = {
      ...employee.toObject(),
      salary,
      username: clerkUser?.username || "Username not found",
    };

    return new NextResponse(JSON.stringify(employeeWithUserName), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ECOMMERCE_STORE_URL || "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[employeeId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export const POST = async (
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const employee = await Employee.findById(params.employeeId);

    if (!employee) {
      return new NextResponse(
        JSON.stringify({ message: "Employee not found" }),
        { status: 404 }
      );
    }

    const {
      username,
      firstName,
      lastName,
      dob,
      joinDate,
      salary,
    } = await req.json();

    if (!firstName || !dob || !dob || !joinDate || !salary) {
      return new NextResponse("Not enough data to create a new product", {
        status: 400,
      });
    }

    // included in previous data, but not included in the new data

    // Update product
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employee._id,
      {
        username,
        firstName,
        lastName,
        dob,
        joinDate,
        salary,
      },
      { new: true }
    );

    await updatedEmployee.save();

    const user = await clerkClient.users.updateUser(employee.clerkId, {
      username: username,
      firstName: firstName,
      lastName: lastName,
    });

    return NextResponse.json(updatedEmployee, { status: 200 });
  } catch (err) {
    console.log("[employeeId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { employeeId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const employee = await Employee.findById(params.employeeId);

    if (!employee) {
      return new NextResponse(
        JSON.stringify({ message: "Employee not found" }),
        { status: 404 }
      );
    }

    await clerkClient.users.deleteUser(employee.clerkId);

    await Employee.findByIdAndDelete(employee._id);

    return new NextResponse(JSON.stringify({ message: "Employee deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[employeeId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

