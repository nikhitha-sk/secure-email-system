import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { generateKeys } from "@/lib/rsa";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  const keys = generateKeys();

  await User.create({
    name,
    email,
    password: hashedPassword,
    publicKey: keys.publicKey,
    privateKey: keys.privateKey,
  });

  return NextResponse.json({ message: "User Registered" });
}