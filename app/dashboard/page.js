import StatsCard from "@/components/StatsCard";
import { getParkingStats } from "@/lib/helpers";
import { parkingSpots } from "@/lib/data";   // імпортуй свої дані

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const stats = getParkingStats(parkingSpots);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Огляд</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Всього місць" value={stats.total} color="amber" />
        <StatsCard title="Вільних" value={stats.available} color="green" />
        <StatsCard title="Середня ціна" value={`${stats.avgPrice} грн/год`} color="blue" />
      </div>
    </div>
  );
}