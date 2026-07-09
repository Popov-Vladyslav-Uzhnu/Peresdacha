export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero секція */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Parking Pro
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Система онлайн-бронювання паркомісць. Зручно, швидко та надійно.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition">
              Переглянути вільні місця
            </button>
            <a href="/about" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Про проект
            </a>
          </div>
        </div>
      </section>

      {/* Секція можливостей */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Можливості системи
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🅿️</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Бронювання місць</h3>
              <p className="text-gray-600">
                Швидке бронювання паркомісця на потрібний час.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Різні зони</h3>
              <p className="text-gray-600">
                VIP, стандарт, електро, для людей з інвалідністю.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Особистий кабінет</h3>
              <p className="text-gray-600">
                Історія бронювань та управління авто.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2026 Владислав | Варіант 11 | Основи обробки та передачі інформації
          </p>
        </div>
      </footer>
    </div>
  )
}