'use client'
import { useState } from 'react'

export default function AddParkingSpot({ onAdd }) {
  const [form, setForm] = useState({
    number: '',
    zone: 'A',
    type: 'standard',
    pricePerHour: '',
    isAvailable: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.number || !form.pricePerHour) return;

    onAdd({
      id: Date.now(),
      number: form.number,
      zone: form.zone,
      type: form.type,
      pricePerHour: Number(form.pricePerHour),
      isAvailable: form.isAvailable
    });

    setForm({ number: '', zone: 'A', type: 'standard', pricePerHour: '', isAvailable: true });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow mb-8 border">
      <h3 className="text-xl font-semibold mb-4">Додати нове паркомісце</h3>
      <div className="grid grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Номер місця (A-101)" 
          value={form.number} 
          onChange={(e) => setForm({...form, number: e.target.value})} 
          required 
          className="border p-3 rounded"
        />
        <input 
          type="number" 
          placeholder="Ціна за годину" 
          value={form.pricePerHour} 
          onChange={(e) => setForm({...form, pricePerHour: e.target.value})} 
          required 
          className="border p-3 rounded"
        />
        <select value={form.zone} onChange={(e) => setForm({...form, zone: e.target.value})} className="border p-3 rounded">
          <option value="A">Зона A</option>
          <option value="B">Зона B</option>
          <option value="C">Зона C</option>
          <option value="VIP">VIP</option>
        </select>
        <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="border p-3 rounded">
          <option value="standard">Стандарт</option>
          <option value="electric">Електро</option>
          <option value="disabled">Для інвалідів</option>
          <option value="motorcycle">Мото</option>
        </select>
      </div>
      <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700">
        Додати місце
      </button>
    </form>
  );
}