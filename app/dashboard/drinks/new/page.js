'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import SpotForm from '@/components/DrinkForm'

export default function NewSpotPage() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/drinks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.errors?.join(', ') || data.error || 'Помилка створення'
        )
      }

      router.push('/dashboard/drinks')
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Link href="/dashboard/drinks" className="text-amber-700 hover:underline mb-4 inline-block">
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Додати нове паркомісце
        </h1>
        <SpotForm
          onSubmit={handleSubmit}
          submitLabel="Створити"
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </div>
  )
}