export const metadata = {
  title: "Dashboard - Адмін-панель",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Огляд паркінгу</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Вільних місць</h3>
          <p className="text-5xl font-bold text-green-600 mt-4">47</p>
          <p className="text-sm text-gray-500 mt-2">з 120 загальних</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Активних бронювань</h3>
          <p className="text-5xl font-bold text-blue-600 mt-4">23</p>
          <p className="text-sm text-gray-500 mt-2">сьогодні</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">Виручка сьогодні</h3>
          <p className="text-5xl font-bold text-emerald-600 mt-4">8 450 ₴</p>
          <p className="text-sm text-gray-500 mt-2">+12% до вчора</p>
        </div>
      </div>
    </div>
  );
}