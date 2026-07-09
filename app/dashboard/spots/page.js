import Link from "next/link";
import { parkingSpots } from "@/lib/data";

export const metadata = {
  title: "Управління паркомісцями",
};

export default function SpotsListPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Паркомісця</h1>
        <Link
          href="/dashboard/spots/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          + Додати місце
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Номер</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Зона</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Тип</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ціна</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дії</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {parkingSpots.map((spot) => (
              <tr key={spot.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{spot.number}</td>
                <td className="px-6 py-4 text-gray-700">{spot.zone}</td>
                <td className="px-6 py-4 text-gray-700">{spot.type}</td>
                <td className="px-6 py-4 text-gray-700">{spot.pricePerHour} грн/год</td>
                <td className="px-6 py-4">
                  {spot.isAvailable ? (
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Вільно</span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Зайнято</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/spots/${spot.id}`}
                    className="text-blue-700 hover:underline"
                  >
                    Переглянути
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}