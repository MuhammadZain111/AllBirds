import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Cart from "@/models/Cart";
import { sendAbandonedCartEmail } from "../../../lib/mailer";

// How long before a cart is considered abandoned
// const ABANDONED_AFTER_MS = 24 * 60 * 60 * 1000; // 24 hours

// const ABANDONED_AFTER_MS = 24 * 60 * 60 * 1000; // 24 hours



const  ABANDONED_AFTER_MS =24 * 60;


export async function GET(request) {

  // ── 1. Security: only Vercel Cron (or your own calls) can trigger this ──
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const cutoff = new Date(Date.now() - ABANDONED_AFTER_MS);

    // ── 2. Find all carts that qualify ──
    const abandonedCarts = await Cart.find({
      status: "active",          // not yet purchased or abandoned
      reminderSent: false,       // haven't emailed yet
      updatedAt: { $lte: cutoff },
    });

    if (!abandonedCarts.length) {
      return NextResponse.json({ message: "No abandoned carts found", processed: 0 });
    }

    let successCount = 0;
    let failCount    = 0;
    const errors     = [];

    // ── 3. Email each cart owner ──
    for (const cart of abandonedCarts) {
      try {
        await sendAbandonedCartEmail({
          to:       cart.userEmail,
          userName: cart.userName,
          items:    cart.items,
        });

        // ── 4. Mark as done only after email succeeds ──
        await Cart.findByIdAndUpdate(cart._id, {
          status:        "abandoned",
          reminderSent:    true,
          reminderSentAt:  new Date(),
        });

        successCount++;
        console.log(`[AbandonedCart] ✓ Emailed ${cart.userEmail} — cart ${cart._id}`);

      } catch (err) {
        // One failure shouldn't stop the rest
        failCount++;
        errors.push({ cartId: cart._id, error: err.message });
        console.error(`[AbandonedCart] ✗ Failed for ${cart.userEmail}:`, err.message);
      }
    }

    return NextResponse.json({
      message:   "Cron job completed",
      processed: abandonedCarts.length,
      success:   successCount,
      failed:    failCount,
      ...(errors.length ? { errors } : {}),
    });

  } catch (error) {
    console.error("[AbandonedCart Cron] Fatal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}