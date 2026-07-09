import mongoose from "mongoose";

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Назва обов'язкова"],
    trim: true,
    maxlength: [100, "Назва не може бути довшою за 100 символів"],
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Ціна обов'язкова"],
    min: [0, "Ціна не може бути від'ємною"],
  },
  emoji: {
    type: String,
    default: "🅿️",
  },
  category: {
    type: String,
    enum: ["standard", "electric", "disabled", "VIP"],
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

drinkSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    const OrderItem = mongoose.model("OrderItem");
    const Order = mongoose.model("Order");

    const affected = await OrderItem
      .find({ drink: doc._id }).distinct("order");

    await OrderItem.deleteMany({ drink: doc._id });

    for (const orderId of affected) {
      const left = await OrderItem.countDocuments({ order: orderId });
      if (left === 0) {
        await Order.deleteOne({ _id: orderId });
      }
    }
  }
  next();
});

export default mongoose.models.Drink || mongoose.model("Drink", drinkSchema);