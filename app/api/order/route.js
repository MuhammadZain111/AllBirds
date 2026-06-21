import { NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    await dbConnect();

    let body;

    // 1. Safe JSON parsing
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 },
      );
    }

    const { userId, items, totalAmount } = body;

    // 2. Validation (important)
    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 },
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { message: "Items are required" },
        { status: 400 },
      );
    }

    if (!totalAmount || totalAmount <= 0) {
      return NextResponse.json(
        { message: "Invalid total amount" },
        { status: 400 },
      );
    }

    // 3. Create order
    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      status: "PENDING",
      paymentStatus: "UNPAID",
    });

    // 4. Success response
    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        order,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("ORDER_CREATION_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
