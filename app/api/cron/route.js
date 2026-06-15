
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { sendAbandonedCartEmail } from "@/lib/mailer";


const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export async function GET(request) {
  // ── Security: verify cron secret ──────────────────────────────────────────
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const cutoff = new Date(Date.now() - TWENTY_FOUR_HOURS_MS);

    // Find carts that:
    //  1. Are still active (not purchased / not already abandoned-flagged)
    //  2. Were last updated more than 24 hours ago
    //  3. Haven't had a reminder sent yet
    const abandonedCarts = await Cart.find({
      status: "active",
      reminderSent: false,
      updatedAt: { $lte: cutoff },
    });

    if (!abandonedCarts.length) {
      return NextResponse.json({
        message: "No abandoned carts found",
        processed: 0,
      });
    }

    let successCount = 0;
    let failCount = 0;
    const errors = [];

    for (const cart of abandonedCarts) {
      try {
        await sendAbandonedCartEmail({
          to: cart.userEmail,
          userName: cart.userName,
          items: cart.items,
        });

        // Mark reminder as sent and cart as abandoned
        await Cart.findByIdAndUpdate(cart._id, {
          reminderSent: true,
          reminderSentAt: new Date(),
          status: "abandoned",
        });

        successCount++;
        console.log(
          `[AbandonedCart] Email sent to ${cart.userEmail} (cartId: ${cart._id})`,
        );
      } catch (emailError) {
        failCount++;
        errors.push({ cartId: cart._id, error: emailError.message });
        console.error(
          `[AbandonedCart] Failed for ${cart.userEmail}:`,
          emailError.message,
        );
      }
    }

    return NextResponse.json({
      message: "Cron job completed",
      processed: abandonedCarts.length,
      success: successCount,
      failed: failCount,
      ...(errors.length ? { errors } : {}),
    });
  } catch (error) {
    console.error("[AbandonedCart Cron]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
