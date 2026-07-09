import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpotById } from "@/lib/data";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const spot = getSpotById(id);
  if (!spot) return { title: "Місце не знайдено" };

  return {
    title: `Місце ${spot.number}`,
    description: `Деталі паркомісця ${spot.number}`,
  };
}

export default async function SpotPage({ params }) {
  const { id } = await params;
  const spot = getSpotById(id);

  if (!spot) {
    notFound();
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-slate-800 to-slate-950 text-white py-12">
        <div className="container mx-auto px-4">
          <Link href="/parking" className="text-slate-300 hover:text-white transition">
            &larr; Назад до списку
          </Link>
          <div className="mt-6 flex items-center gap-6">
            <span className="text-7xl">🅿️</span>
            <div>
              <h1 className="text-5xl font-bold">Місце {spot.number}</h1>
              <p className="text-slate-300 text-xl">Зона {spot.zone} • {spot.type}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-1">Ціна</h3>
                <p className="text-4xl font-bold text-emerald-600">{spot.pricePerHour} грн/год</p>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-1">Статус</h3>
                {spot.isAvailable ? (
                  <span className="text-green-600 font-semibold text-2xl">Вільно</span>
                ) : (
                  <span className="text-red-600 font-semibold text-2xl">Зайнято</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-sm font-bold mb-3">Опис</h3>
              <p className="text-gray-700 leading-relaxed">
                Зручне паркомісце в зоні {spot.zone}. Ідеально підходить для {spot.type.toLowerCase()} транспорту.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}