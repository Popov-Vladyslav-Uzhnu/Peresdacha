import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";

export async function GET() {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return Response.json(users);
}