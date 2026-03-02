import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";

export async function GET() {
  await connectDB();
  const emails = await Email.find().sort({ createdAt: -1 });
  return NextResponse.json(emails);
}