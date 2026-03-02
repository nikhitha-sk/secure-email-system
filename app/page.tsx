"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function ShieldLockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="10" width="6" height="5" rx="1" />
      <path d="M10 10V8a2 2 0 1 1 4 0v2" />
    </svg>
  );
}

function FingerprintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </svg>
  );
}

function HashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="9" y2="9" />
      <line x1="4" x2="20" y1="15" y2="15" />
      <line x1="10" x2="8" y1="3" y2="21" />
      <line x1="16" x2="14" y1="3" y2="21" />
    </svg>
  );
}

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

const FEATURES = [
  {
    icon: ShieldLockIcon,
    title: "RSA Encryption",
    description: "Messages are encrypted using RSA public-key cryptography, ensuring only the intended recipient can read them.",
  },
  {
    icon: FingerprintIcon,
    title: "Digital Signatures",
    description: "Every email is digitally signed, providing proof of sender authenticity and message integrity.",
  },
  {
    icon: HashIcon,
    title: "SHA-256 Hashing",
    description: "Cryptographic hash functions verify that message content has not been altered in transit.",
  },
];

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState<{ publicKey?: string; privateKey?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    setUser(loggedUser);

    if (loggedUser) {
      setLoading(true);
      fetch("/api/login?email=" + loggedUser)
        .then((res) => res.json())
        .then((data) => {
          if (data.publicKey) {
            setKeys(data);
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center pt-12 pb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
          End-to-end encrypted
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.1] mb-4">
          Secure Email,{" "}
          <span className="text-accent">Verified Identity</span>
        </h1>

        <p className="max-w-lg text-base text-muted-foreground leading-relaxed mb-8 text-pretty">
          A digital signature-based email system powered by RSA encryption and
          SHA-256 hashing. Authenticate senders, protect messages, and ensure
          data integrity.
        </p>

        {user ? (
          <div className="flex items-center gap-3">
            <Link
              href="/inbox"
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Go to Inbox
            </Link>
            <Link
              href="/compose"
              className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              Compose Email
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors"
            >
              Get Started
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

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="group card flex flex-col gap-3 p-5"
          >
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent-muted text-accent">
              <feature.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Keys Section (authenticated users) */}
      {user && (
        <section className="mb-16">
          <div className="card p-0 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent-muted text-accent">
                  <KeyIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    Your RSA Key Pair
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Signed in as {user}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowKeys(!showKeys)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {showKeys ? (
                  <EyeOffIcon className="w-4 h-4" />
                ) : (
                  <EyeIcon className="w-4 h-4" />
                )}
                {showKeys ? "Hide Keys" : "Reveal Keys"}
              </button>
            </div>

            {showKeys && keys && (
              <div className="p-5 animate-fade-in">
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-accent uppercase tracking-wider">
                      Public Key
                    </span>
                    <span className="text-xs text-muted-foreground">
                      (shareable)
                    </span>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border border-border">
                    <p className="font-mono text-xs text-muted-foreground break-all leading-relaxed">
                      {keys.publicKey}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-destructive uppercase tracking-wider">
                      Private Key
                    </span>
                    <span className="text-xs text-muted-foreground">
                      (keep secret)
                    </span>
                  </div>
                  <div className="p-3 bg-muted rounded-lg border border-destructive/20">
                    <p className="font-mono text-xs text-muted-foreground break-all leading-relaxed">
                      {keys.privateKey}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {showKeys && loading && (
              <div className="p-5 text-center text-sm text-muted-foreground">
                Loading keys...
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
