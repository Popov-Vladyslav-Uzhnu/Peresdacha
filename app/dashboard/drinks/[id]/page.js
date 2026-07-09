'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import DrinkActions from '@/components/DrinkActions'

export default function SpotDetailPage({ params }) {
  const { id } = use(params)
  const [spot, setSpot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchSpot() {
      try {
        const response = await fetch(`/api/drinks/${id}`)
        if (!response.ok) {
          if (response.status === 404) throw new Error('Паркомісце не знайдено')
          throw new Error('Помилка завантаження')
        }
        const data = await response.json()
        setSpot(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSpot()
  }, [id])

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin h-12 w-12 border-b-2 border-amber-700 rounded-full"></div></div>
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">404</h1>
        <p className="text-gray-600 mb-4">{error}</p>
        <Link href="/dashboard/drinks" className="text-blue-600 hover:underline">
          &larr; До списку
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link href="/dashboard/drinks" className="text-blue-600 hover:underline">
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-lg shadow p-8 mt-4">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold">Місце {spot.number}</h1>
            <p className="text-gray-500">Зона {spot.zone} • {spot.type}</p>
          </div>
          <span className={`px-3 py-1 rounded text-sm ${spot.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {spot.isAvailable ? 'Вільно' : 'Зайнято'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Ціна за годину</p>
            <p className="text-2xl font-bold">{spot.pricePerHour} грн</p>
          </div>
        </div>

        <div className="mt-8">
          <DrinkActions spotId={spot.id} />
        </div>
      </div>
    </div>
  )
}