"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
      <path d="m2 2 20 20" />
    </svg>
  );
}

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState<{ publicKey?: string; privateKey?: string } | null>(null);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    setUser(loggedUser);

    if (loggedUser) {
      fetch("/api/login?email=" + loggedUser)
        .then((res) => res.json())
        .then((data) => {
          if (data.publicKey) setKeys(data);
        });
    }
  }, []);

  return (
    <div className="animate-fade-in flex flex-col items-center pt-16 pb-20">
      {/* Hero */}
      <section className="flex flex-col items-center text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance leading-[1.15] mb-3 text-foreground">
          Secure Email System
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          RSA encryption, digital signatures, and SHA-256 hashing.
        </p>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/inbox"
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Inbox
            </Link>
            <Link
              href="/compose"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Compose
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Register
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </section>

      {/* Keys (authenticated only) */}
      {user && keys && (
        <section className="w-full max-w-lg mt-14">
          <div className="card p-0 overflow-hidden">
            <button
              onClick={() => setShowKeys(!showKeys)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-muted text-accent">
                  <KeyIcon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  RSA Key Pair
                </span>
              </div>
              {showKeys ? (
                <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
              ) : (
                <EyeIcon className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {showKeys && (
              <div className="px-4 pb-4 animate-fade-in flex flex-col gap-3">
                <div>
                  <p className="text-xs font-medium text-accent mb-1.5">Public Key</p>
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <p className="font-mono text-xs text-muted-foreground break-all leading-relaxed">
                      {keys.publicKey}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-destructive mb-1.5">Private Key</p>
                  <div className="p-3 bg-muted rounded-lg border border-destructive/20">
                    <p className="font-mono text-xs text-muted-foreground break-all leading-relaxed">
                      {keys.privateKey}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
