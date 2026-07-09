import MenuCard from "@/components/MenuCard";

// Дані для паркомісць
const parkingSpots = [
  { id: 1, number: "A-101", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true },
  { id: 2, number: "B-205", zone: "B", type: "electric", pricePerHour: 70, isAvailable: true },
  { id: 3, number: "VIP-01", zone: "VIP", type: "disabled", pricePerHour: 120, isAvailable: false },
];

export default function Home() {
  return (
    <div>
      {/* Hero секція */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Parking Pro
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Система онлайн-бронювання паркомісць. Зручно, швидко та надійно.
          </p>
        </div>
      </section>

      {/* Можливості */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Можливості системи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🅿️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Бронювання місць</h3>
              <p className="text-gray-600">Швидке бронювання паркомісця.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Різні зони</h3>
              <p className="text-gray-600">VIP, стандарт, електро, для людей з інвалідністю.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Особистий кабінет</h3>
              <p className="text-gray-600">Історія бронювань та управління авто.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Доступні паркомісця (з компонентом) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Доступні паркомісця
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {parkingSpots.map(spot => (
              <MenuCard key={spot.id} {...spot} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}