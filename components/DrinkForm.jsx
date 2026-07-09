'use client'

import { useState } from 'react'
import Link from 'next/link'

const TYPES = ['standard', 'electric', 'disabled', 'premium']

export default function SpotForm({
  initialData = {},
  onSubmit,
  submitLabel = 'Зберегти',
  isSubmitting = false,
  error
}) {
  const [formData, setFormData] = useState({
    number: initialData.number || '',
    zone: initialData.zone || '',
    type: initialData.type || 'standard',
    pricePerHour: initialData.pricePerHour || '',
    isAvailable: initialData.isAvailable !== undefined ? initialData.isAvailable : true,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      pricePerHour: Number(formData.pricePerHour)
    })
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow max-w-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Номер місця *</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Зона *</label>
            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Тип</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500"
            >
              {TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">Ціна за годину (грн) *</label>
            <input
              type="number"
              name="pricePerHour"
              value={formData.pricePerHour}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />
            <span className="text-sm text-gray-700">Вільне</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 font-bold disabled:opacity-50"
          >
            {isSubmitting ? 'Збереження...' : submitLabel}
          </button>
          <Link
            href="/dashboard/drinks"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}