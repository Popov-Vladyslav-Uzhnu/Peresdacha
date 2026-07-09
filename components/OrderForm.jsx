'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const emptyItem = () => ({ spot: '', quantity: 1 })

export default function OrderForm({ onSubmit, isSubmitting, error }) {
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === 'admin'

  const [spots, setSpots] = useState([])
  const [items, setItems] = useState([emptyItem()])
  const [notes, setNotes] = useState('')
  const [loadingSpots, setLoadingSpots] = useState(true)

  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    fetch('/api/drinks') // заміни на /api/spots якщо є окремий endpoint
      .then((res) => res.json())
      .then((data) => {
        const available = (data || []).filter((s) => s.isAvailable)
        setSpots(available)
        setLoadingSpots(false)
      })
      .catch(() => setLoadingSpots(false))
  }, [])

  useEffect(() => {
    if (!isAdmin) return
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data)
      })
      .catch(() => {})
  }, [isAdmin])

  useEffect(() => {
    if (isAdmin && session?.user?.id && !userId) {
      setUserId(session.user.id)
    }
  }, [isAdmin, session?.user?.id, userId])

  const spotsById = useMemo(() => {
    const map = new Map()
    spots.forEach((s) => map.set(s._id, s))
    return map
  }, [spots])

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => {
      const spot = spotsById.get(item.spot)
      if (!spot) return sum
      return sum + spot.pricePerHour * Number(item.quantity || 0)
    }, 0)
  }, [items, spotsById])

  const updateItem = (index, patch) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)))
  }

  const addItem = () => setItems((prev) => [...prev, emptyItem()])

  const removeItem = (index) => {
    setItems((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))
  }

  const canSubmit =
    items.length > 0 &&
    items.every((it) => it.spot && Number(it.quantity) >= 1) &&
    (!isAdmin || Boolean(userId))

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      items: items.map((it) => ({
        spot: it.spot,
        quantity: Number(it.quantity),
      })),
      notes: notes.trim(),
    }
    if (isAdmin && userId) payload.user = userId
    onSubmit(payload)
  }

  if (loadingSpots) {
    return <div className="bg-white rounded-lg shadow p-8 text-gray-500">Завантаження місць...</div>
  }

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {isAdmin && (
          <div>
            <label className="block text-gray-700 font-bold mb-2">Замовник *</label>
            <select
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500"
            >
              <option value="">Оберіть користувача</option>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name} ({u.email}){u.role === 'admin' ? ' — admin' : ''}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Адміністратор може створити замовлення на будь-якого користувача.
            </p>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-gray-700 font-bold">Позиції бронювання *</label>
            <button
              type="button"
              onClick={addItem}
              className="text-amber-700 hover:underline text-sm font-medium"
            >
              + Додати місце
            </button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => {
              const spot = spotsById.get(item.spot)
              const subtotal = spot ? spot.pricePerHour * Number(item.quantity || 0) : 0
              return (
                <div
                  key={index}
                  className="flex gap-3 items-start bg-gray-50 p-3 rounded border"
                >
                  <div className="flex-1">
                    <select
                      required
                      value={item.spot}
                      onChange={(e) => updateItem(index, { spot: e.target.value })}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-amber-500"
                    >
                      <option value="">Оберіть місце</option>
                      {spots.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.number} ({s.zone}) — {s.pricePerHour} грн/год
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      required
                      value={item.quantity}
                      onChange={(e) => updateItem(index, { quantity: e.target.value })}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="w-24 text-right pt-2 text-sm text-gray-700">
                    {subtotal ? `${subtotal} грн` : '—'}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    className="text-red-600 hover:text-red-800 disabled:text-gray-300 text-lg px-2"
                    title="Видалити позицію"
                  >
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-bold mb-2">Коментар</label>
          <textarea
            rows="3"
            maxLength="300"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Напр.: забронювати на 2 години..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-amber-500"
          />
        </div>

        {totalPrice > 0 && (
          <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded">
            <p className="text-gray-700">
              <strong>До сплати:</strong>{' '}
              <span className="text-xl font-bold text-amber-700">{totalPrice} грн</span>
              <span className="text-sm text-gray-500 ml-2">({items.length} поз.)</span>
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 font-bold disabled:opacity-50"
          >
            {isSubmitting ? 'Створення...' : 'Створити бронювання'}
          </button>
          <Link href="/dashboard/orders" className="bg-gray-300 text-gray-700 px-6 py-3 rounded hover:bg-gray-400 font-bold inline-block">
            Скасувати
          </Link>
        </div>
      </form>
    </>
  )
}