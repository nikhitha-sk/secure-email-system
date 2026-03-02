"use client";
import { useEffect, useState } from "react";
import DecryptText from "@/components/DecryptText";

export default function Inbox() {
  const [inboxEmails, setInboxEmails] = useState<any[]>([]);
  const [sentEmails, setSentEmails] = useState<any[]>([]);

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

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl mb-6">Inbox</h1>

      {inboxEmails.map((mail) => (
        <div
          key={mail._id}
          className={`card mb-4 ${
            !mail.seen ? "new-mail" : ""
          }`}
        >
          <div className="flex justify-between">
            <h2 className="font-semibold">{mail.subject}</h2>
            <span className="text-sm text-gray-400">
              {new Date(mail.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <p className="text-sm text-gray-400 mb-2">
            From: {mail.from}
          </p>

          <p>
            <DecryptText text={mail.message} />
          </p>

          {!mail.seen && (
            <button
              onClick={() => markSeen(mail._id)}
              className="mt-3 text-blue-400"
            >
              Mark as Seen
            </button>
          )}
        </div>
      ))}

      {sentEmails.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl mb-4 text-yellow-300">Sent Mail</h2>
          {sentEmails.map((mail) => (
            <div
              key={mail._id}
              className="card mb-4 bg-gray-800 text-gray-300">
              <div className="flex justify-between">
                <h2 className="font-semibold">{mail.subject}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(mail.createdAt).toLocaleTimeString()}
                </span>
              </div>

              <p className="text-sm text-gray-400 mb-2">
                To: {mail.to}
              </p>

              <p>
                <DecryptText text={mail.message} />
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}