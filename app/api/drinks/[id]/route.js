import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Drink from "@/lib/models/Drink";
import { authorize } from "@/lib/authorize";
import { updateDrinkSchema } from "@/lib/validations/drink";
import { sanitizeObject } from "@/lib/sanitize";

// GET — публічний
export async function GET(request, { params }) {
  await dbConnect();
  const { id } = await params;

  try {
    const drink = await Drink.findById(id);

    if (!drink) {
      return NextResponse.json({ error: "Напій не знайдено" }, { status: 404 });
    }

    return NextResponse.json(drink);
  } catch (error) {
    return NextResponse.json({ error: "Невалідний ID" }, { status: 400 });
  }
}

// PUT — тільки admin
export async function PUT(request, { params }) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const data = await request.json();

    const result = updateDrinkSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return NextResponse.json({ errors: messages }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);

    const drink = await Drink.findByIdAndUpdate(id, sanitized, {
      new: true,
      runValidators: true,
    });

    if (!drink) {
      return NextResponse.json({ error: "Напій не знайдено" }, { status: 404 });
    }

    return NextResponse.json(drink);
  } catch (error) {
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

// DELETE — тільки admin
export async function DELETE(request, { params }) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const drink = await Drink.findByIdAndDelete(id);

    if (!drink) {
      return NextResponse.json({ error: "Напій не знайдено" }, { status: 404 });
    }

    return NextResponse.json({ message: `Напій "${drink.name}" видалено` });
  } catch (error) {
    return NextResponse.json({ error: "Невалідний ID" }, { status: 400 });
  }
}