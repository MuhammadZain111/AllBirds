import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
{
  userId: String,
  userEmail: String,
  userName: String,

  items: [
    {
      productId: String,
      quantity: Number
    }
  ],

  status: {
    type: String,
    enum: ["active", "abandoned", "converted"],
    default: "active"
  },

  lastActivityAt: {
    type: Date,
    default: Date.now
  },

  reminderSent: {
    type: Boolean,
    default: false
  },
   
  updatedAt:  Date,

  reminderSentAt: Date,

  abandonedEmailSent: {
    type: Boolean,
    default: false
  }
}
,{timestamps: true}
)

const Cart =
  mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
