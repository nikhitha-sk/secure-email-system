// app/layout.tsx

import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Secure Email System",
  description: "Digital Signature Based Secure Email System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Top Navbar */}
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-red-500">
            SecureMail
          </Link>

          <div className="space-x-6">
            <Link href="/inbox" className="hover:text-blue-600">
              Inbox
            </Link>
            <Link href="/compose" className="hover:text-blue-600">
              Compose
            </Link>
            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>
            <Link href="/register" className="hover:text-blue-600">
              Register
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}