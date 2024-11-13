import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";
import Category from "@/lib/models/Category";


export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      categoryId,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !categoryId || !price || !expense) {
      return new NextResponse("Not enough data to create a product", { status: 400 });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      categoryId,
      category: {
        title: category.title,
        description: category.description,
      },
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "0", 10);

    const query = Product.find().sort({ createdAt: "desc" }).populate({
      path: "collections",
      model: Collection,
    });

    const products = limit > 0 ? await query.limit(limit) : await query;

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};


export const dynamic = "force-dynamic";

