// POST — тільки admin
export async function POST(request) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();

  try {
    const data = await request.json();
    const drink = await Drink.create(data);

    return Response.json(drink, { status: 201 });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}