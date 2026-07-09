"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DrinkForm from "@/components/DrinkForm";

export default function EditDrinkPage() {
  const { id } = useParams();
  const [drink, setDrink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetch(`/api/drinks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Напій не знайдено");
        return res.json();
      })
      .then((data) => { 
        setDrink(data); 
        setLoading(false); 
      })
      .catch((err) => { 
        setLoadError(err.message); 
        setLoading(false); 
      });
  }, [id]);

  if (loading) return <div className="bg-white rounded-lg shadow p-8 animate-pulse">Завантаження...</div>;
  if (loadError) return <div className="bg-red-50 border border-red-200 rounded-lg p-6">{loadError}</div>;

  return (
    <div>
      <Link href={`/dashboard/drinks/${id}`} className="text-amber-700 hover:underline mb-4 inline-block">
        ← Назад до напою
      </Link>
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Редагувати: {drink.name}</h1>
        <DrinkForm mode="edit" drinkId={id} initialData={drink} />
      </div>
    </div>
  );
}