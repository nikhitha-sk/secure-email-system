import crypto from "crypto";

export function createHash(message: string) {
  return crypto.createHash("sha256").update(message).digest("hex");
}