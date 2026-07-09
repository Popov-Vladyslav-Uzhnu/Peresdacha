import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Drink from "@/lib/models/Drink";
import { authorize } from "@/lib/authorize";
import { createDrinkSchema } from "@/lib/validations/drink";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET() {
  await dbConnect();
  const drinks = await Drink.find({}).sort({ createdAt: -1 });
  return NextResponse.json(drinks);
}

export async function POST(request) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();

  try {
    const data = await request.json();

    const result = createDrinkSchema.safeParse(data);
    if (!result.success) {
      const messages = result.error.errors.map((e) => e.message);
      return NextResponse.json({ errors: messages }, { status: 400 });
    }

    const sanitized = sanitizeObject(result.data);
    const drink = await Drink.create(sanitized);

    return NextResponse.json(drink, { status: 201 });
  } catch (error) {
    if (error.message === "Unexpected end of JSON input" || error instanceof SyntaxError) {
      return NextResponse.json({ error: "Невалідний JSON у тілі запиту" }, { status: 400 });
    }
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}