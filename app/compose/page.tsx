"use client";
import { useState } from "react";

export default function Compose() {
  const [form, setForm] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const sendEmail = async () => {
    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-email": localStorage.getItem("user") || "",
      },
      body: JSON.stringify(form),
    });

    alert("Email Sent");
  };

  return (
    <div className="card max-w-xl mx-auto">
      <h2 className="text-xl mb-4">New Message</h2>

      <input
        placeholder="To"
        className="w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, to: e.target.value })
        }
      />

      <input
        placeholder="Subject"
        className="w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, subject: e.target.value })
        }
      />

      <textarea
        placeholder="Message"
        rows={6}
        className="w-full mb-3"
        onChange={(e) =>
          setForm({ ...form, message: e.target.value })
        }
      />

      <button
        onClick={sendEmail}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}