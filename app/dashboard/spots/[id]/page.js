import Link from "next/link";
import { notFound } from "next/navigation";
import { getSpotById } from "@/lib/data";

export default async function SpotDetailPage({ params }) {
  const { id } = await params;
  const spot = getSpotById(id);

  if (!spot) {
    notFound();
  }

  return (
    <div>
      <Link href="/dashboard/spots" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-xl shadow p-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-6">
            <span className="text-7xl">🅿️</span>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Місце {spot.number}</h1>
              <p className="text-xl text-gray-600">{spot.zone} • {spot.type}</p>
            </div>
          </div>
          <div className="space-x-3">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Редагувати</button>
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">Видалити</button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Ціна</h3>
            <p className="text-3xl font-bold text-emerald-600">{spot.pricePerHour} грн/год</p>
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Статус</h3>
            {spot.isAvailable ? (
              <span className="text-green-600 font-semibold text-2xl">Вільно</span>
            ) : (
              <span className="text-red-600 font-semibold text-2xl">Зайнято</span>
            )}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-bold mb-1">Зона</h3>
            <p className="text-xl">{spot.zone}</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-gray-500 text-sm font-bold mb-3">Опис</h3>
          <p className="text-gray-700 leading-relaxed">
            Зручне паркомісце в зоні {spot.zone}. Підходить для {spot.type.toLowerCase()} транспорту.
          </p>
        </div>
      </div>
    </div>
  );
}