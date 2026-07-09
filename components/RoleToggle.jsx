'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

export default function RoleToggle({ userId, currentRole }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const newRole = currentRole === 'admin' ? 'user' : 'admin'

  const handleToggle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        toast.error(data.error || "Помилка зміни ролі")
        return
      }

      toast.success(`Роль змінено: ${newRole}`)
      router.refresh()
    } catch (error) {
      toast.error("Помилка з'єднання")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="px-3 py-1 text-xs font-medium rounded-full transition-colors disabled:opacity-50
        bg-amber-100 text-amber-700 hover:bg-amber-200"
    >
      {loading ? "..." : currentRole === 'admin' ? 'Зробити user' : 'Зробити admin'}
    </button>
  )
}