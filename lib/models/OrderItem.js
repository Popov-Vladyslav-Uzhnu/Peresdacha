import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },
    spot: {   // адаптовано під Parking Pro
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spot",
      required: true,
      index: true,
    },
    quantity: { type: Number, required: true, min: 1, max: 20 },
    priceAtOrder: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.OrderItem ||
  mongoose.model("OrderItem", orderItemSchema);