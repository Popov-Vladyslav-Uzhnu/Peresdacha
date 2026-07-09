'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DrinkActions from '@/components/DrinkActions'

export default function DrinksPage() {
  const [spots, setSpots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function fetchSpots() {
    try {
      setLoading(true)
      const response = await fetch('/api/drinks')
      if (!response.ok) throw new Error('Помилка завантаження')
      const data = await response.json()
      setSpots(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpots()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Видалити це паркомісце?')) return

    try {
      const response = await fetch(`/api/drinks/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Помилка видалення')
      fetchSpots()
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin h-12 w-12 border-b-2 border-amber-700 rounded-full"></div></div>

  if (error) return (
    <div className="bg-red-50 p-4 rounded">
      <p className="text-red-600">{error}</p>
      <button onClick={fetchSpots} className="mt-2 text-blue-600 underline">Спробувати знову</button>
    </div>
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Паркомісця ({spots.length})</h1>
        <Link href="/dashboard/drinks/new" className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800">
          + Додати місце
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Номер</th>
              <th className="px-6 py-3 text-left">Зона</th>
              <th className="px-6 py-3 text-left">Тип</th>
              <th className="px-6 py-3 text-left">Ціна/год</th>
              <th className="px-6 py-3 text-left">Статус</th>
              <th className="px-6 py-3 text-left">Дії</th>
            </tr>
          </thead>
          <tbody>
            {spots.map(spot => (
              <tr key={spot.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">
                  <Link href={`/dashboard/spots/${spot.id}`} className="text-blue-600 hover:underline">
                    {spot.number}
                  </Link>
                </td>
                <td className="px-6 py-4">{spot.zone}</td>
                <td className="px-6 py-4">{spot.type}</td>
                <td className="px-6 py-4">{spot.pricePerHour} грн</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-sm ${spot.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {spot.isAvailable ? 'Вільно' : 'Зайнято'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <DrinkActions spotId={spot.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}