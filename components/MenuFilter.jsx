'use client'
import { useState } from 'react'
import MenuCard from './MenuCard'
import { parkingSpots, getZones } from '@/lib/data'

const categories = getZones()

export default function MenuFilter() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Всі')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const filteredItems = parkingSpots.filter(item => {
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