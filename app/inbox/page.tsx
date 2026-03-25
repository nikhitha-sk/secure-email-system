"use client";
import { useEffect, useState } from "react";
import DecryptText from "@/components/DecryptText";

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
      <path d="m21.854 2.147-10.94 10.939" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ShieldAlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function EmptyInboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

interface EmailItem {
  _id: string;
  from: string;
  to: string;
  subject: string;
  message: string;
  seen: boolean;
  createdAt: string;
  integrity?: "valid" | "invalid" | "error" | "unknown";
}

export default function Inbox() {
  const [inboxEmails, setInboxEmails] = useState<EmailItem[]>([]);
  const [sentEmails, setSentEmails] = useState<EmailItem[]>([]);
  const [activeTab, setActiveTab] = useState<"inbox" | "sent">("inbox");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [tamperingId, setTamperingId] = useState<string | null>(null);

  const fetchEmails = async () => {
    const logged = localStorage.getItem("user");
    if (!logged) return;
    const res = await fetch(
      `/api/emails?to=${encodeURIComponent(logged)}&from=${encodeURIComponent(logged)}`
    );
    const data = await res.json();
    setInboxEmails(data.inbox || []);
    setSentEmails(data.sent || []);
  };

  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 5000);
    return () => clearInterval(interval);
  }, []);

  const markSeen = async (id: string) => {
    await fetch("/api/emails", {
      method: "PATCH",
      body: JSON.stringify({ id }),
    });
    fetchEmails();
  };

  const simulateTamper = async (id: string) => {
    setTamperingId(id);
    try {
      await fetch("/api/emails", {
        method: "PUT",
        body: JSON.stringify({ id }),
      });
      // Refresh to show the tampered message and failed signature
      fetchEmails();
    } finally {
      setTamperingId(null);
    }
  };

  const unreadCount = inboxEmails.filter((m) => !m.seen).length;
  const displayEmails = activeTab === "inbox" ? inboxEmails : sentEmails;

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Messages</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {unreadCount > 0
              ? `${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All caught up"}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit mb-6">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "inbox"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <InboxIcon className="w-4 h-4" />
          Inbox
          {unreadCount > 0 && (
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-accent text-accent-foreground font-semibold">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("sent")}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === "sent"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <SendIcon className="w-4 h-4" />
          Sent
          {sentEmails.length > 0 && (
            <span className="ml-1 text-xs text-muted-foreground">
              {sentEmails.length}
            </span>
          )}
        </button>
      </div>

      {/* Email List */}
      {displayEmails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <EmptyInboxIcon className="w-12 h-12 text-muted-foreground/30 mb-4" />
          <p className="text-sm text-muted-foreground">
            {activeTab === "inbox"
              ? "Your inbox is empty"
              : "No sent messages yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {displayEmails.map((mail) => {
            const isExpanded = expandedId === mail._id;
            const isNew = activeTab === "inbox" && !mail.seen;

            return (
              <div
                key={mail._id}
                className={`card p-0 overflow-hidden transition-all animate-slide-in ${
                  isNew ? "border-l-2 border-l-accent" : ""
                } ${mail.seen && activeTab === "inbox" ? "opacity-60" : ""}`}
              >
                {/* Email Row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : mail._id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  {/* Unread indicator */}
                  <div className="flex-shrink-0 w-2">
                    {isNew && (
                      <span className="block w-2 h-2 rounded-full bg-accent" />
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      activeTab === "inbox"
                        ? "bg-accent-muted text-accent"
                        : "bg-warning/10 text-warning"
                    }`}
                  >
                    {(activeTab === "inbox" ? mail.from : mail.to)
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm truncate ${
                          isNew ? "font-semibold text-foreground" : "font-medium text-foreground/80"
                        }`}
                      >
                        {mail.subject || "(No subject)"}
                      </span>
                      <span className="flex-shrink-0 text-xs text-muted-foreground">
                        {formatTime(mail.createdAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {activeTab === "inbox" ? `From: ${mail.from}` : `To: ${mail.to}`}
                    </p>
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pl-[4.5rem] border-t border-border pt-3 animate-fade-in">
                    {/* Integrity Status Badge */}
                    <div className="mb-3 flex items-center gap-2">
                      {mail.integrity === "valid" && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                          <ShieldCheckIcon className="w-3.5 h-3.5" />
                          Signature Verified
                        </div>
                      )}
                      {mail.integrity === "invalid" && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                          <ShieldAlertIcon className="w-3.5 h-3.5" />
                          Message Integrity Failed - Possible Tampering
                        </div>
                      )}
                      {mail.integrity === "error" && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                          <ShieldAlertIcon className="w-3.5 h-3.5" />
                          Could Not Verify Signature
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <DecryptText text={mail.message} />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {isNew && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markSeen(mail._id);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-accent hover:bg-accent-muted transition-colors"
                        >
                          <CheckIcon className="w-3.5 h-3.5" />
                          Mark as read
                        </button>
                      )}

                      {/* Dev-only Tamper Button */}
                      {process.env.NODE_ENV !== "production" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            simulateTamper(mail._id);
                          }}
                          disabled={tamperingId === mail._id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShieldAlertIcon className="w-3.5 h-3.5" />
                          {tamperingId === mail._id ? "Tampering..." : "Simulate Tamper"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
