import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Email from "@/models/Email";
import User from "@/models/User";
import { verifySignature } from "@/lib/signature";

export async function GET(req: Request) {
  await connectDB();
  const url = new URL(req.url);
  const to = url.searchParams.get("to");
  const from = url.searchParams.get("from");

  const result: any = {};

  if (to) {
    const emails = await Email.find({ to }).sort({ createdAt: -1 });
    result.inbox = await Promise.all(
      emails.map(async (email) => {
        let integrity = "unknown";
        try {
          const signer = await User.findOne({ email: email.from });
          if (signer && email.signature) {
            const canonicalPayload = JSON.stringify({
              from: email.from,
              to: email.to,
              subject: email.subject,
              message: email.message,
            });
            const isValid = verifySignature(
              canonicalPayload,
              email.signature,
              signer.publicKey
            );
            integrity = isValid ? "valid" : "invalid";
          }
        } catch {
          integrity = "error";
        }
        return {
          ...email.toObject(),
          integrity,
        };
      })
    );
  }

  if (from) {
    const emails = await Email.find({ from }).sort({ createdAt: -1 });
    result.sent = await Promise.all(
      emails.map(async (email) => {
        let integrity = "unknown";
        try {
          const signer = await User.findOne({ email: email.from });
          if (signer && email.signature) {
            const canonicalPayload = JSON.stringify({
              from: email.from,
              to: email.to,
              subject: email.subject,
              message: email.message,
            });
            const isValid = verifySignature(
              canonicalPayload,
              email.signature,
              signer.publicKey
            );
            integrity = isValid ? "valid" : "invalid";
          }
        } catch {
          integrity = "error";
        }
        return {
          ...email.toObject(),
          integrity,
        };
      })
    );
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

// Dev-only endpoint to simulate message tampering for testing
export async function PUT(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not available in production" },
      { status: 403 }
    );
  }

  await connectDB();
  const { id } = await req.json();

  const email = await Email.findById(id);
  if (!email) {
    return NextResponse.json({ error: "Email not found" }, { status: 404 });
  }

  // Tamper with the message by changing the last character
  const tamperedMessage =
    email.message.slice(0, -1) +
    (email.message[email.message.length - 1] === "!" ? "?" : "!");
  
  await Email.findByIdAndUpdate(id, { message: tamperedMessage });

  return NextResponse.json({ 
    message: "Email tampered for testing - signature verification will now fail",
    tamperedMessage 
  });
}