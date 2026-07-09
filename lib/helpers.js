import dbConnect from "./db";
import Spot from "./models/Spot";
import Order from "./models/Order";

export async function getParkingStats() {
  await dbConnect();

  const spots = await Spot.find();
  const total = spots.length;
  const available = spots.filter((s) => s.isAvailable).length;
  const unavailable = total - available;
  const zones = [...new Set(spots.map((s) => s.zone))];
  const avgPrice = total > 0
    ? Math.round(spots.reduce((sum, s) => sum + s.pricePerHour, 0) / total)
    : 0;

  return {
    total,
    available,
    unavailable,
    zonesCount: zones.length,
    avgPrice,
  };
}

export async function getOrderStats() {
  await dbConnect();

  const [total, pending, completed] = await Promise.all([
    Order.countDocuments({}),
    Order.countDocuments({ status: "pending" }),
    Order.countDocuments({ status: "completed" }),
  ]);

  return { total, pending, completed };
}