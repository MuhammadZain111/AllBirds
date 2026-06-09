



export async function POST(request) {
  try {
    const { orderId, paymentMethod } = req.body;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Fake payment success (replace with Stripe/Razorpay later)
    const paymentSuccess = true;

    if (!paymentSuccess) {
      order.paymentStatus = "FAILED";
      await order.save();
      return res.status(400).json({ message: "Payment failed" });
    }

    // Payment success
    order.paymentStatus = "PAID";
    order.status = "CONFIRMED";

    await order.save();

    //  Reduce stock here
    for (const item of order.items) {
      await Product.updateOne(
        { _id: item.productId, "sizes.size": item.size },
        { $inc: { "sizes.$.stock": -item.quantity } }
      );
    }

    res.json({ message: "Payment successful", order });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 



