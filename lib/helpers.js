// lib/helpers.js
export function getParkingStats(parkingSpots) {
  const total = parkingSpots.length;
  const available = parkingSpots.filter(s => s.isAvailable).length;
  const occupied = total - available;
  const zonesCount = [...new Set(parkingSpots.map(s => s.zone))].length;
  const avgPrice = Math.round(
    parkingSpots.reduce((sum, s) => sum + s.pricePerHour, 0) / total
  );

  return { total, available, occupied, zonesCount, avgPrice };
}