// PUT — тільки admin
export async function PUT(request, { params }) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();
  const { id } = await params;

  try {
    const data = await request.json();
    const drink = await Drink.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!drink) {
      return Response.json({ error: "Напій не знайдено" }, { status: 404 });
    }

    return Response.json(drink);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return Response.json({ errors: messages }, { status: 400 });
    }

    return Response.json({ error: "Помилка сервера" }, { status: 500 });
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
      return Response.json({ error: "Напій не знайдено" }, { status: 404 });
    }

    return Response.json({ message: `Напій "${drink.name}" видалено` });
  } catch (error) {
    return Response.json({ error: "Невалідний ID" }, { status: 400 });
  }
}