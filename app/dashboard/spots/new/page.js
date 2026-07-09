'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewSpotPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    number: "",
    zone: "A",
    type: "standard",
    pricePerHour: "",
    isAvailable: true,
  });

  const handleChange = (e) => {
    const value = e.target.name === "isAvailable" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Нове паркомісце:", formData);
    // Тут пізніше буде додавання в базу
    router.push("/dashboard/spots");
  };

  return (
    <div>
      <Link href="/dashboard/spots" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Назад до списку
      </Link>

      <div className="bg-white rounded-xl shadow p-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Додати нове паркомісце</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Номер місця *</label>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Ціна за годину (грн) *</label>
              <input
                type="number"
                name="pricePerHour"
                value={formData.pricePerHour}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Зона</label>
              <select name="zone" value={formData.zone} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="VIP">VIP</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Тип</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg">
                <option value="standard">Стандарт</option>
                <option value="electric">Електро</option>
                <option value="disabled">Для інвалідів</option>
                <option value="motorcycle">Мотоцикл</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <label className="text-gray-700">Доступне для бронювання</label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
            >
              Додати місце
            </button>
            <Link
              href="/dashboard/spots"
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 font-medium"
            >
              Скасувати
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}