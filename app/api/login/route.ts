import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: "No user" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Wrong password" });

  return NextResponse.json({ message: "Login Success", email });
}

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return NextResponse.json({});

  const user = await User.findOne({ email });

  if (!user) return NextResponse.json({});

  return NextResponse.json({
    publicKey: user.publicKey,
    privateKey: user.privateKey,
  });
}