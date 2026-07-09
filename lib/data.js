export const parkingSpots = [
  { id: 1, number: "A-101", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true, description: "Зручне місце біля входу" },
  { id: 2, number: "A-102", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true, description: "Добре освітлене місце" },
  { id: 3, number: "B-201", zone: "B", type: "electric", pricePerHour: 70, isAvailable: true, description: "Місце з зарядкою" },
  { id: 4, number: "B-202", zone: "B", type: "standard", pricePerHour: 50, isAvailable: false, description: "Зайнято до 18:00" },
  { id: 5, number: "VIP-01", zone: "VIP", type: "disabled", pricePerHour: 120, isAvailable: true, description: "VIP зона для інвалідів" },
  { id: 6, number: "C-301", zone: "C", type: "motorcycle", pricePerHour: 30, isAvailable: true, description: "Для мотоциклів" },
  { id: 7, number: "VIP-02", zone: "VIP", type: "standard", pricePerHour: 100, isAvailable: false, description: "Зайнято" },
  { id: 8, number: "A-103", zone: "A", type: "electric", pricePerHour: 70, isAvailable: true, description: "Зарядка для електро" },
];

export function getSpotById(id) {
  return parkingSpots.find((spot) => spot.id === Number(id));
}

export function getZones() {
  return ["Всі", ...new Set(parkingSpots.map((item) => item.zone))];
}