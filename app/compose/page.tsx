"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Compose() {
  const router = useRouter();
  const [form, setForm] = useState({ to: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": localStorage.getItem("user") || "",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setTimeout(() => router.push("/inbox"), 2000);
      } else {
        setError("Failed to send.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] animate-fade-in">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-muted text-accent mb-4">
          <ShieldCheckIcon className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Sent
        </h2>
        <p className="text-sm text-muted-foreground">
          Redirecting to inbox...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">Compose</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Encrypted and signed with RSA
        </p>
      </div>

      <form onSubmit={sendEmail} className="card p-0 overflow-hidden">
        {error && (
          <div className="mx-5 mt-5 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* To */}
        <div className="flex items-center border-b border-border">
          <label htmlFor="to" className="px-5 text-sm font-medium text-muted-foreground w-20 flex-shrink-0">
            To
          </label>
          <input
            id="to"
            type="email"
            placeholder="Recipient email"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
            className="flex-1 border-0 rounded-none bg-transparent focus:ring-0 focus:shadow-none py-3.5"
            required
            autoComplete="email"
            style={{ boxShadow: "none" }}
          />
        </div>

        <div className="flex items-center border-b border-border">
          <label htmlFor="subject" className="px-5 text-sm font-medium text-muted-foreground w-20 flex-shrink-0">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="flex-1 border-0 rounded-none bg-transparent focus:ring-0 focus:shadow-none py-3.5"
            required
            style={{ boxShadow: "none" }}
          />
        </div>

        <div className="p-5">
          <textarea
            placeholder="Message"
            rows={10}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border-0 bg-transparent p-0 text-sm text-foreground placeholder:text-muted-foreground focus:ring-0 focus:shadow-none resize-none leading-relaxed"
            required
            style={{ boxShadow: "none" }}
          />
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheckIcon className="w-3.5 h-3.5 text-accent" />
            <span>Encrypted</span>
          </div>

          <button
            type="submit"
            disabled={loading || !form.to || !form.subject || !form.message}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <SendIcon className="w-4 h-4" />
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
