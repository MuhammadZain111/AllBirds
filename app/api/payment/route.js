import { NextResponse } from "next/server";




export async function POST(req) {
  try {
    const { orderId } = await req.json();

    const order = await Order.findById(orderId);

    // Payment gateway logic here

    const paymentSuccess = true;

    if (paymentSuccess) {
      order.paymentStatus = "PAID";

      order.status = "CONFIRMED";

      await order.save();

      // Reduce Stock

      for (const item of order.items) {
        await Product.updateOne(
          {
            _id: item.productId,
            "sizes.size": item.size,
          },

          {
            $inc: {
              "sizes.$.stock": -item.quantity,
            },
          },
        );
      }
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
