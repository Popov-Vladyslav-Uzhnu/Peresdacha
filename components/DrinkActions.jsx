'use client'

import { useRouter } from 'next/navigation'

export default function DrinkActions({ spotId, spotNumber }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Видалити паркомісце ${spotNumber}?`)) return

    try {
      const response = await fetch(`/api/drinks/${spotId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Помилка видалення')

      router.push('/dashboard/drinks')
      router.refresh()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
      >
        Видалити
      </button>
    </div>
  )
}