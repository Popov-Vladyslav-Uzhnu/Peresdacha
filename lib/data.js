let parkingSpots = [
  { id: 1, number: "A-101", zone: "A", type: "standard", pricePerHour: 50, isAvailable: true },
  { id: 2, number: "B-205", zone: "B", type: "electric", pricePerHour: 70, isAvailable: true },
  { id: 3, number: "VIP-01", zone: "VIP", type: "disabled", pricePerHour: 120, isAvailable: false },
  { id: 4, number: "C-312", zone: "C", type: "standard", pricePerHour: 45, isAvailable: true },
  { id: 5, number: "A-105", zone: "A", type: "electric", pricePerHour: 75, isAvailable: false },
  { id: 6, number: "D-401", zone: "D", type: "standard", pricePerHour: 55, isAvailable: true },
  { id: 7, number: "VIP-02", zone: "VIP", type: "disabled", pricePerHour: 130, isAvailable: true },
  { id: 8, number: "B-210", zone: "B", type: "electric", pricePerHour: 80, isAvailable: true },
]

let nextId = 9

export { parkingSpots }

export function getSpotById(id) {
  return parkingSpots.find((spot) => spot.id === Number(id))
}

export function getZones() {
  return ["Всі", ...new Set(parkingSpots.map((item) => item.zone))]
}

export function addSpot(data) {
  const newSpot = {
    id: nextId++,
    number: data.number,
    zone: data.zone,
    type: data.type || "standard",
    pricePerHour: Number(data.pricePerHour),
    isAvailable: data.isAvailable !== undefined ? data.isAvailable : true
  }
  parkingSpots.push(newSpot)
  return newSpot
}

export function updateSpot(id, data) {
  const index = parkingSpots.findIndex((spot) => spot.id === Number(id))
  if (index === -1) return null

  parkingSpots[index] = { ...parkingSpots[index], ...data, id: parkingSpots[index].id }
  return parkingSpots[index]
}

export function deleteSpot(id) {
  const index = parkingSpots.findIndex((spot) => spot.id === Number(id))
  if (index === -1) return null

  const deleted = parkingSpots[index]
  parkingSpots.splice(index, 1)
  return deleted
}