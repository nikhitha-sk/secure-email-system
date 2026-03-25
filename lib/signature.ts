import crypto from "crypto";

export function signMessage(payload: string, privateKey: string) {
  return crypto
    .sign("sha256", Buffer.from(payload), privateKey)
    .toString("base64");
}

export function verifySignature(
  payload: string,
  signature: string,
  publicKey: string
) {
  try {
    return crypto.verify(
      "sha256",
      Buffer.from(payload),
      publicKey,
      Buffer.from(signature, "base64")
    );
  } catch {
    return false;
  }
}