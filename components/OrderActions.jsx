'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner";

export default function OrderActions({ orderId, orderStatus }) {
  const router = useRouter()
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Помилка видалення");
        return;
      }
      toast.success("Замовлення видалено");
      setShowConfirm(false);
      router.push("/dashboard/orders");
      router.refresh();
    } catch (error) {
      toast.error("Помилка видалення");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data.error || "Помилка скасування");
        return;
      }
      toast.success("Замовлення скасовано");
      router.refresh();
    } catch (error) {
      toast.error("Помилка скасування");
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
    <div className="flex gap-2">
      {orderStatus !== "cancelled" && orderStatus !== "completed" && (
        <button 
          onClick={handleCancel}
          disabled={loading}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          Скасувати
        </button>
      )}
      <button 
        onClick={() => setShowConfirm(true)}
        disabled={loading}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        Видалити
      </button>
    </div>
  )
}