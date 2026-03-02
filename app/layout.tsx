"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    router.push("/login");
  };

  // refresh user state whenever the path changes or storage is updated
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [router.pathname]);

  useEffect(() => {
    const update = () => setUser(localStorage.getItem("user"));
    window.addEventListener("storage", update);
    window.addEventListener("userChange", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("userChange", update);
    };
  }, []);

  return (
    <html>
      <body>
        <nav className="flex justify-between p-4 bg-slate-900 border-b border-slate-700">
          <Link href="/" className="text-xl font-bold text-blue-400">
            SecureMail
          </Link>

          <div className="space-x-4">
            {user && <Link href="/">Show My Keys</Link>}
            {user && <Link href="/inbox">Inbox</Link>}
            {user && <Link href="/compose">Compose</Link>}
            {user && (
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500"
              >
                Logout
              </button>
            )}
            {!user && <Link href="/login">Login</Link>}
            {!user && <Link href="/register">Register</Link>}
          </div>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}