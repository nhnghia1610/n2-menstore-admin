import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Employee from "@/lib/models/Employee";
import { clerkClient } from "@clerk/nextjs/server";


export const POST = async (req: NextRequest) => {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();


        const {
            username,
            password,
            firstName,
            lastName,
            email,
            dob,
            joinDate,
            salary,
        } = await req.json();

        if (!username || !password || !firstName || !lastName || !email || !dob || !joinDate || !salary) {
            return new NextResponse("Not enough data to create an employee", {
                status: 400,
            });
        }


        const user = await clerkClient.users.createUser({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            publicMetadata:{role:"employee"}
        });

        const newEmployee = await Employee.create({
            clerkId: user.id,
            firstName,
            lastName,
            email,
            dob,
            joinDate,
            salary,
        });

        await newEmployee.save();

        return NextResponse.json(newEmployee, { status: 200 });
    } catch (err) {
        console.log("[employees_POST]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const GET = async (req: NextRequest) => {
    try {
        await connectToDB();

        const employees = await Employee.find()
            .sort({ createdAt: "desc" })

        return NextResponse.json(employees, { status: 200 });
    } catch (err) {
        console.log("[employees_GET]", err);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

export const dynamic = "force-dynamic";

