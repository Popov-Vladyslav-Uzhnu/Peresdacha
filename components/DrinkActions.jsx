'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DrinkActions({ spotId }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    console.log(`Видалення паркомісця ${spotId}`)
    setShowConfirm(false)
    router.refresh() // оновлює сторінку
  }

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <span className="text-red-600 font-semibold self-center">Видалити?</span>
        <button 
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer text-sm"
        >
          Так
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer text-sm"
        >
          Ні
        </button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <button className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 cursor-pointer text-sm">
        Редагувати
      </button>
      <button 
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer text-sm"
      >
        Видалити
      </button>
    </div>
  )
}