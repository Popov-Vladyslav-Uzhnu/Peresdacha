import Link from "next/link";

const reservations = [
  { id: 1, customer: "Іван Петренко", spot: "A-101", date: "2026-07-10", time: "14:00-16:00", status: "Активне" },
  { id: 2, customer: "Марія Коваль", spot: "B-205", date: "2026-07-11", time: "10:00-12:00", status: "Завершене" },
  { id: 3, customer: "Олег Сидоренко", spot: "VIP-01", date: "2026-07-12", time: "18:00-20:00", status: "Активне" },
];

export const metadata = {
  title: "Бронювання",
};

export default function ReservationsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Бронювання</h1>
        <Link
          href="/dashboard/reservations/new"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          + Нове бронювання
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клієнт</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Місце</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Час</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reservations.map((res) => (
              <tr key={res.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{res.customer}</td>
                <td className="px-6 py-4 text-gray-700">{res.spot}</td>
                <td className="px-6 py-4 text-gray-700">{res.date}</td>
                <td className="px-6 py-4 text-gray-700">{res.time}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded ${
                    res.status === "Активне" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}