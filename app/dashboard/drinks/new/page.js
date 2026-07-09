'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewSpotPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const formData = new FormData(e.target)
    const data = {
      number: formData.get('number'),
      zone: formData.get('zone'),
      type: formData.get('type'),
      pricePerHour: Number(formData.get('pricePerHour')),
      isAvailable: formData.get('isAvailable') === 'on'
    }

    try {
      const response = await fetch('/api/drinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Помилка створення')
      }

      router.push('/dashboard/drinks')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <Link href="/dashboard/drinks" className="text-blue-600 hover:underline">
        &larr; Назад до списку
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">Додати паркомісце</h1>

      {error && <div className="bg-red-50 border border-red-200 p-4 rounded mb-4"><p className="text-red-600">{error}</p></div>}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Номер місця *</label>
          <input type="text" name="number" required className="w-full border rounded px-3 py-2" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Зона *</label>
          <input type="text" name="zone" required className="w-full border rounded px-3 py-2" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Тип</label>
          <select name="type" className="w-full border rounded px-3 py-2">
            <option value="standard">Standard</option>
            <option value="electric">Electric</option>
            <option value="disabled">Disabled</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ціна за годину (грн) *</label>
          <input type="number" name="pricePerHour" min="1" required className="w-full border rounded px-3 py-2" />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isAvailable" defaultChecked />
            <span className="text-sm text-gray-700">Вільне</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-amber-700 text-white px-6 py-2 rounded hover:bg-amber-800 disabled:opacity-50"
        >
          {saving ? 'Збереження...' : 'Створити місце'}
        </button>
      </form>
    </div>
  )
}