import Link from "next/link";
import FavoriteButton from "./FavoriteButton";

export default function MenuCard({ 
  id, 
  number, 
  zone, 
  type, 
  pricePerHour, 
  isAvailable = true 
}) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition ${!isAvailable ? 'opacity-60' : ''}`}>
      <div className="h-32 bg-slate-100 flex items-center justify-center text-6xl">
        🅿️
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Місце {number}</h3>
          <div className="flex items-center gap-2">
            {id && <FavoriteButton spotId={id} />}
            {isAvailable ? (
              <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Вільно</span>
            ) : (
              <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">Зайнято</span>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3">
          Зона: {zone} • Тип: {type}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-emerald-700 font-bold text-lg">{pricePerHour} грн/год</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{type}</span>
            {id && (
              <Link
                href={`/parking/${id}`}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Детальніше →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}