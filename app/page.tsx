// app/page.tsx

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Digital Signature Based Secure Email System
      </h1>

      <p className="text-gray-600 max-w-xl mb-8">
        This system ensures <strong>Authenticity</strong> and{" "}
        <strong>Integrity</strong> of emails using RSA Digital Signatures
        and SHA-256 hashing. Even a single character change will be detected.
      </p>

      <div className="space-x-4">
        <Link
          href="/register"
          className="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600"
        >
          Get Started
        </Link>

        <Link
          href="/inbox"
          className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600"
        >
          Go to Inbox
        </Link>
      </div>

      <div className="mt-12 bg-white shadow-md p-6 rounded max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Project Features</h2>

        <ul className="text-left list-disc list-inside text-gray-700 space-y-2">
          <li>User Registration & Login</li>
          <li>Automatic RSA Key Generation</li>
          <li>SHA-256 Message Hashing</li>
          <li>Digital Signature Creation</li>
          <li>Public Key Verification</li>
          <li>Tampering Detection</li>
        </ul>
      </div>
    </div>
  );
}