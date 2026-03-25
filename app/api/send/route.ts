import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";
import User from "@/models/User";
import { signMessage } from "@/lib/signature";

export async function POST(req: Request) {
  await connectDB();

  const { to, subject, message } = await req.json();

  const senderEmail = req.headers.get("x-user-email"); // logged in user

  const sender = await User.findOne({ email: senderEmail });

  // Create canonical payload for signing (includes all message fields)
  const canonicalPayload = JSON.stringify({
    from: senderEmail,
    to,
    subject,
    message,
  });

  const signature = signMessage(canonicalPayload, sender.privateKey);

  await Email.create({
    from: senderEmail,
    to,
    subject,
    message,
    signature,
  });

  return NextResponse.json({ message: "Email Sent" });
}