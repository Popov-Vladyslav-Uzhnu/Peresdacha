import Image from 'next/image';
import MenuCard from "@/components/MenuCard";

// Дані для паркомісць (адаптовано під твою тему)
const parkingSpots = [
  { id: 1, number: "A-101", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true, emoji: "🅿️" },
  { id: 2, number: "B-205", zone: "B", type: "electric", pricePerHour: 70, isAvailable: true, emoji: "⚡" },
  { id: 3, number: "VIP-01", zone: "VIP", type: "disabled", pricePerHour: 120, isAvailable: false, emoji: "♿" },
];

export default function Home() {
  return (
    <div>
      {/* Hero секція з фоновим зображенням */}
  <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
  <Image
    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70" // parking / modern car lot
    alt="Parking Pro — сучасна система бронювання паркомісць"
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/60 to-black/40" />
  
  <div className="relative container mx-auto px-4 text-center text-white z-10">
    <h1 className="text-6xl font-bold mb-6 tracking-tight">
      Parking Pro
    </h1>
    <p className="text-2xl mb-10 max-w-2xl mx-auto opacity-90">
      Система онлайн-бронювання паркомісць. Зручно, швидко та надійно.
    </p>
    <a 
      href="#spots" 
      className="inline-block bg-white text-blue-700 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition"
    >
      Переглянути вільні місця
    </a>
  </div>
</section>

      {/* Можливості */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Можливості системи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-6">🅿️</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Бронювання місць</h3>
              <p className="text-gray-600">Швидке бронювання паркомісця в реальному часі.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-6">📍</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Різні зони</h3>
              <p className="text-gray-600">VIP, стандарт, електро, для людей з інвалідністю.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">
              <div className="text-5xl mb-6">🔒</div>
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">Особистий кабінет</h3>
              <p className="text-gray-600">Історія бронювань та управління авто.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Доступні паркомісця */}
      <section id="spots" className="py-16 bg-white">
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