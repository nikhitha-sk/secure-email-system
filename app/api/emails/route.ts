import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const to = url.searchParams.get("to");
  const from = url.searchParams.get("from");

  const result: any = {};

  if (to) {
    result.inbox = await Email.find({ to }).sort({ createdAt: -1 });
  }
  if (from) {
    result.sent = await Email.find({ from }).sort({ createdAt: -1 });
  }

  // if neither parameter provided, treat as bad request
  if (!to && !from) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result);
}

export async function PATCH(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Email.findByIdAndUpdate(id, { seen: true });
  return NextResponse.json({ message: "Updated" });
}