import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderItem from "@/lib/models/OrderItem";
import Drink from "@/lib/models/Drink";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import {
  updateOrderSchema,
  userUpdateOrderSchema,
} from "@/lib/validations/order";
import { sanitizeObject } from "@/lib/sanitize";

void [Drink, User, OrderItem];

export async function GET(request, { params }) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const order = await Order.findById(id)
      .populate({ path: "user", select: "name email role" })
      .populate({
        path: "items",
        populate: {
          path: "drink",
          select: "name price emoji category description",
        },
      });

    if (!order) {
      return Response.json({ error: "Не знайдено" }, { status: 404 });
    }

    const isOwner = order.user?._id?.toString() === session.user.id;
    if (session.user.role !== "admin" && !isOwner) {
      return Response.json({ error: "Немає доступу" }, { status: 403 });
    }

    return Response.json(order);
  } catch {
    return Response.json({ error: "Невалідний ID" }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return Response.json({ error: "Не знайдено" }, { status: 404 });
    }

    const isAdmin = session.user.role === "admin";
    const isOwner = order.user.toString() === session.user.id;

    if (!isAdmin && !isOwner) {
      return Response.json({ error: "Немає доступу" }, { status: 403 });
    }

    const body = await request.json();

    const schema = isAdmin ? updateOrderSchema : userUpdateOrderSchema;
    const result = schema.safeParse(body);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    if (!isAdmin && order.status !== "pending") {
      return Response.json(
        { error: "Скасувати можна лише замовлення зі статусом pending" },
        { status: 409 }
      );
    }

    const sanitized = sanitizeObject(result.data);

    const updated = await Order.findByIdAndUpdate(id, sanitized, {
      new: true,
      runValidators: true,
    })
      .populate({ path: "user", select: "name email" })
      .populate({
        path: "items",
        populate: { path: "drink", select: "name price emoji category" },
      });

    return Response.json(updated);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return Response.json({ error: "Невалідний JSON" }, { status: 400 });
    }
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Не знайдено" }, { status: 404 });
    }
    return Response.json({ message: "Замовлення видалено" });
  } catch {
    return Response.json({ error: "Невалідний ID" }, { status: 400 });
  }
}