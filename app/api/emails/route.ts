import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const to = url.searchParams.get("to");

  if (!to) {
    // client didn't specify recipient; return empty array or 400
    return NextResponse.json([], { status: 400 });
  }

  const emails = await Email.find({ to }).sort({ createdAt: -1 });
  return NextResponse.json(emails);
}

export async function PATCH(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Email.findByIdAndUpdate(id, { seen: true });
  return NextResponse.json({ message: "Updated" });
}