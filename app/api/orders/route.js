import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderItem from "@/lib/models/OrderItem";
import Drink from "@/lib/models/Drink";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import { createOrderSchema } from "@/lib/validations/order";
import { sanitizeObject } from "@/lib/sanitize";

void [User, Drink, OrderItem]; // для populate

export async function GET(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const drink = searchParams.get("drink");

  const filter = session.user.role === "admin" ? {} : { user: session.user.id };

  if (status) filter.status = status;

  if (drink) {
    const orderIds = await OrderItem.find({ drink }).distinct("order");
    filter._id = { $in: orderIds };
  }

  const orders = await Order.find(filter)
    .populate({ path: "user", select: "name email role" })
    .populate({
      path: "items",
      populate: { path: "drink", select: "name price emoji category" },
    })
    .sort({ createdAt: -1 });

  return Response.json(orders);
}

export async function POST(request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  let createdOrderId = null;

  try {
    const data = await request.json();

    const result = createOrderSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);

    let orderUserId = session.user.id;
    if (session.user.role === "admin" && sanitized.user) {
      const targetUser = await User.findById(sanitized.user);
      if (!targetUser) {
        return Response.json({ error: "Користувача не знайдено" }, { status: 404 });
      }
      orderUserId = targetUser._id;
    }

    const drinkIds = sanitized.items.map((i) => i.drink);
    const drinks = await Drink.find({ _id: { $in: drinkIds } });
    const drinkById = new Map(drinks.map((d) => [d._id.toString(), d]));

    for (const item of sanitized.items) {
      const drink = drinkById.get(item.drink);
      if (!drink) {
        return Response.json({ error: `Напій не знайдено: ${item.drink}` }, { status: 404 });
      }
      if (!drink.isAvailable) {
        return Response.json({ error: `Напій зараз недоступний: ${drink.name}` }, { status: 409 });
      }
    }

    const totalPrice = sanitized.items.reduce((sum, item) => {
      const drink = drinkById.get(item.drink);
      return sum + drink.price * item.quantity;
    }, 0);

    const order = await Order.create({
      user: orderUserId,
      totalPrice,
      notes: sanitized.notes,
    });
    createdOrderId = order._id;

    const itemsToCreate = sanitized.items.map((item) => {
      const drink = drinkById.get(item.drink);
      return {
        order: order._id,
        drink: drink._id,
        quantity: item.quantity,
        priceAtOrder: drink.price,
      };
    });
    await OrderItem.insertMany(itemsToCreate);

    const populated = await Order.findById(order._id)
      .populate({ path: "user", select: "name email" })
      .populate({
        path: "items",
        populate: { path: "drink", select: "name price emoji category" },
      });

    return Response.json(populated, { status: 201 });
  } catch (err) {
    if (createdOrderId) {
      try {
        await Order.deleteOne({ _id: createdOrderId });
      } catch {}
    }

    if (err.message === "Unexpected end of JSON input" || err instanceof SyntaxError) {
      return Response.json({ error: "Невалідний JSON у тілі запиту" }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}