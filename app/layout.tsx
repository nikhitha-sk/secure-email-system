"use client";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ComposeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userChange"));
    router.push("/login");
  };

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [pathname]);

  useEffect(() => {
    const update = () => setUser(localStorage.getItem("user"));
    window.addEventListener("storage", update);
    window.addEventListener("userChange", update);
    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("userChange", update);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <html className={`${inter.className} ${jetbrainsMono.variable}`}>
      <head>
        <title>SecureMail - Encrypted Email System</title>
        <meta
          name="description"
          content="Secure email communication using RSA Digital Signatures and SHA-256 hashing."
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-xl border-b border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <ShieldIcon className="w-5 h-5 text-accent" />
            <span className="text-lg font-semibold tracking-tight">
              SecureMail
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {user ? (
              <>
                <Link
                  href="/"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive("/")
                      ? "bg-accent-muted text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <KeyIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Keys</span>
                </Link>
                <Link
                  href="/inbox"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive("/inbox")
                      ? "bg-accent-muted text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <InboxIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Inbox</span>
                </Link>
                <Link
                  href="/compose"
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive("/compose")
                      ? "bg-accent-muted text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <ComposeIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Compose</span>
                </Link>

                <div className="w-px h-5 bg-border mx-2" />

                <span className="text-xs text-muted-foreground mr-2 hidden md:inline">
                  {user}
                </span>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                  aria-label="Log out"
                >
                  <LogOutIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    isActive("/login")
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-md text-sm font-medium bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
