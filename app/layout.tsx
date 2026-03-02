"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  return (
    <html>
      <body>
        <nav className="flex justify-between p-4 bg-slate-900 border-b border-slate-700">
          <Link href="/" className="text-xl font-bold text-blue-400">
            SecureMail
          </Link>

          <div className="space-x-4">
            {user && <Link href="/inbox">Inbox</Link>}
            {user && <Link href="/compose">Compose</Link>}
            {!user && <Link href="/login">Login</Link>}
            {!user && <Link href="/register">Register</Link>}
          </div>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}