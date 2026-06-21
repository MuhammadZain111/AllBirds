import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/Cart";

// POST /api/cart  — add or update a cart
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    console.log("Here the api  call to add to Cart is Triggered ");

    const { userId, userEmail, userName, items } = body;

    if (!userId || !userEmail || !items?.length) {
      return NextResponse.json(
        { error: "userId, userEmail, and items are required" },
        { status: 400 },
      );
    }

    const cart = await Cart.findOneAndUpdate(
      { userId, status: "active" },
      {
        userId,
        userEmail,
        userName: userName || "Customer",
        items,

        // IMPORTANT: activity tracking
        lastActivityAt: new Date(),
        updatedAt: new Date(),

        // reset email flags when user comes back
        reminderSent: false,
        reminderSentAt: null,
        abandonedEmailSent: false,
      },
      { upsert: true, new: true },
    );

    return NextResponse.json({
      success: true,
      cartId: cart._id,
    });
  } catch (error) {
    console.error("[POST /api/cart]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// PATCH /api/cart  — mark cart as converted (purchased)
export async function PATCH(request) {
  try {
    await connectDB();
    const { userId } = await request.json();

    await Cart.findOneAndUpdate(
      { userId, status: "active" },
      {
        status: "converted",
        updatedAt: new Date(),
      },
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PATCH /api/cart]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
