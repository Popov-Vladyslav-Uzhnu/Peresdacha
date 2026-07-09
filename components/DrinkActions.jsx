'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DrinkActions({ drinkId, drinkName }) {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  async function handleDelete() {
    if (!confirm(`Видалити "${drinkName}"?`)) return;

    try {
      const response = await fetch(`/api/drinks/${drinkId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Помилка видалення');
      router.push('/dashboard/drinks');
      router.refresh();
    } catch (err) {
      alert(err.message);
    }
  }

  if (!isAdmin) return null;

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(`/dashboard/drinks/${drinkId}/edit`)}
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 text-sm"
      >
        Редагувати
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
      >
        Видалити
      </button>
    </div>
  );
}