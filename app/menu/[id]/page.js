export async function generateMetadata({ params }) {
  const { id } = await params;
  // await dbConnect(); // якщо потрібно
  const drink = await Drink.findById(id).lean(); // або твоя модель

  if (!drink) return { title: "Не знайдено" };

  return {
    title: drink.name,
    description: drink.description || "Паркомісце у системі Parking Pro",
    openGraph: {
      title: drink.name,
      description: drink.description || "Паркомісце у системі Parking Pro",
      images: [{ url: "/og-image.svg" }],
    },
  };
}