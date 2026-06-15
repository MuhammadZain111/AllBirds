import cron from "node-cron";
import connectDB from "@/lib/mongodb";
import Cart from "@/models/Cart";

cron.schedule("0 * * * *", async () => {
  // runs every hour
  await connectDB();

  const threshold = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const carts = await Cart.find({
    status: "active",
    lastActivityAt: { $lt: threshold },
    abandonedEmailSent: false
  });

  for (const cart of carts) {
    cart.status = "abandoned";
    cart.abandonedEmailSent = true;
    cart.reminderSentAt = new Date();

    await cart.save();

    // 👉 trigger email here
    console.log("Send abandoned email to:", cart.userEmail);
  }
});