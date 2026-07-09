import dbConnect from "@/lib/db";
import Drink from "@/lib/models/Drink";   // ← заміни на свою модель (Drink / Spot / Book тощо)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticRoutes = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/menu`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  let dynamicRoutes = [];
  try {
    await dbConnect();
    const items = await Drink.find({ available: true }).select("_id updatedAt").lean();
    dynamicRoutes = items.map((item) => ({
      url: `${siteUrl}/menu/${item._id}`,
      lastModified: item.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap: не вдалося завантажити динамічні URL", e);
  }

  return [...staticRoutes, ...dynamicRoutes];
}