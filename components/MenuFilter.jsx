'use client'
import { useState } from 'react'
import MenuCard from './MenuCard'

const parkingItems = [
  { id: 1, number: "A-101", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true },
  { id: 2, number: "A-102", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true },
  { id: 3, number: "B-201", zone: "B", type: "electric", pricePerHour: 70, isAvailable: true },
  { id: 4, number: "B-202", zone: "B", type: "standard", pricePerHour: 50, isAvailable: false },
  { id: 5, number: "VIP-01", zone: "VIP", type: "disabled", pricePerHour: 120, isAvailable: true },
  { id: 6, number: "C-301", zone: "C", type: "motorcycle", pricePerHour: 30, isAvailable: true },
  { id: 7, number: "VIP-02", zone: "VIP", type: "standard", pricePerHour: 100, isAvailable: false },
  { id: 8, number: "A-103", zone: "A", type: "electric", pricePerHour: 70, isAvailable: true },
]

const categories = ["Всі", ...new Set(parkingItems.map(item => item.zone))]

export default function MenuFilter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Всі')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const filteredItems = parkingItems.filter(item => {
    const matchesSearch = item.number.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = activeCategory === 'Всі' || item.zone === activeCategory
    const matchesAvailability = !showAvailableOnly || item.isAvailable
    return matchesSearch && matchesCategory && matchesAvailability
  })

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Пошук по номеру місця..."
        className="w-full px-4 py-3 border rounded-lg mb-6 focus:outline-none focus:border-blue-500"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
              activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 mb-6 cursor-pointer">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-gray-700">Тільки вільні місця</span>
      </label>

      <p className="text-sm text-gray-500 mb-4">
        Знайдено: {filteredItems.length} з {parkingItems.length}
      </p>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuCard key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <p className="text-center py-12 text-gray-400">Нічого не знайдено</p>
      )}
    </div>
  )
}