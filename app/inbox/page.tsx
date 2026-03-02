"use client";
import { useEffect, useState } from "react";

export default function Inbox() {
  const [emails, setEmails] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/emails")
      .then((res) => res.json())
      .then(setEmails);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inbox</h1>
      {emails.map((email) => (
        <div
          key={email._id}
          className="bg-white shadow p-4 mb-3 rounded"
        >
          <h2 className="font-semibold">{email.subject}</h2>
          <p>{email.from}</p>
        </div>
      ))}
    </div>
  );
}