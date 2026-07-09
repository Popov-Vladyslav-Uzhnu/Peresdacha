'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

export default function DrinkActions({ drinkId, drinkName }) {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/drinks/${drinkId}`, { method: "DELETE" });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || "Помилка видалення");
      }
      toast.success("Напій видалено");
      setShowConfirm(false);
      router.push("/dashboard/drinks");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      setShowConfirm(false);
    } finally {
      setLoading(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="space-x-2">
        <span className="text-red-600 font-semibold mr-2">Видалити?</span>
        <button 
          onClick={handleDelete} 
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? "Видалення..." : "Так"}
        </button>
        <button 
          onClick={() => setShowConfirm(false)}
          disabled={loading}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Ні
        </button>
      </div>
    )
  }

  return (
    <div className="space-x-2">
      <button className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 cursor-pointer">
        Редагувати
      </button>
      <button 
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
      >
        Видалити
      </button>
    </div>
  )
}