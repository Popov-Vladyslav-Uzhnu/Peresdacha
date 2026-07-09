"use client";

import Link from "next/link";
import DrinkForm from "@/components/DrinkForm";

export default function NewDrinkPage() {
  return (
    <div>
      <Link href="/dashboard/drinks" className="text-amber-700 hover:underline mb-4 inline-block">
        ← Назад до списку
      </Link>
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Додати нове паркомісце</h1>
        <DrinkForm mode="create" />
      </div>
    </div>
  );
}