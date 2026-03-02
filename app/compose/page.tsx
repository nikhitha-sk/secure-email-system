"use client";
import { useState } from "react";

export default function Compose() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    subject: "",
    message: "",
  });

  const sendEmail = async () => {
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify(form),
    });
    alert("Email Sent");
  };

  return (
    <div className="p-6">
      <input
        placeholder="From"
        onChange={(e) => setForm({ ...form, from: e.target.value })}
      />
      <input
        placeholder="To"
        onChange={(e) => setForm({ ...form, to: e.target.value })}
      />
      <input
        placeholder="Subject"
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <textarea
        placeholder="Message"
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />
      <button
        onClick={sendEmail}
        className="bg-red-500 text-white px-4 py-2 mt-3 rounded"
      >
        Send
      </button>
    </div>
  );
}