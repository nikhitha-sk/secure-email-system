import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";
import User from "@/models/User";
import { createHash } from "@/lib/hash";
import { signMessage } from "@/lib/signature";

export async function POST(req: Request) {
  await connectDB();

  const { from, to, subject, message } = await req.json();

  const sender = await User.findOne({ email: from });

  const hash = createHash(message);
  const signature = signMessage(hash, sender.privateKey);

  await Email.create({
    from,
    to,
    subject,
    message,
    signature,
  });

  return NextResponse.json({ message: "Email Sent" });
}