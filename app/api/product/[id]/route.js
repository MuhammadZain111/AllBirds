import Product from "@/models/Product";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // console.log("params:", params);
    const { id } = await params;

    // 1. Validate ID Exists
    if (!id) {
      return Response.json(
        { success: false, message: "Product ID is required" },
        { status: 400 },
      );
    }

    // 2. Optional: validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return Response.json(
        { success: false, message: "Invalid Product ID format" },
        { status: 400 },
      );
    }

    // 3. Simulate DB call (replace with real DB query)
    // const product = { id, name: "Demo Product" };
    const product = await Product.findById(id);

    // 4. Handle not found case
    if (!product) {
      return Response.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }

    // 5. Success response
    return Response.json({ success: true, product: product }, { status: 200 });
  } catch (error) {
    console.error("GET /product/[id] error:", error);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
