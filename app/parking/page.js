import MenuCard from "@/components/MenuCard";

const allSpots = [
  { id: 1, number: "A-101", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true },
  { id: 2, number: "A-102", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true },
  { id: 3, number: "B-201", zone: "B", type: "electric", pricePerHour: 70, isAvailable: true },
  { id: 4, number: "B-202", zone: "B", type: "standard", pricePerHour: 50, isAvailable: false },
];

export default function ParkingPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-slate-800 to-slate-950 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Всі паркомісця</h1>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allSpots.map(spot => (
              <MenuCard key={spot.id} {...spot} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}