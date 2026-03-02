import crypto from "crypto";

export function signMessage(hash: string, privateKey: string) {
  return crypto
    .privateEncrypt(privateKey, Buffer.from(hash))
    .toString("base64");
}

export function verifySignature(
  hash: string,
  signature: string,
  publicKey: string
) {
  const decrypted = crypto
    .publicDecrypt(publicKey, Buffer.from(signature, "base64"))
    .toString();

  return decrypted === hash;
}