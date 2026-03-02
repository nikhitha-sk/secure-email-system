"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.message) {
      alert("Registration Successful!");
      router.push("/login");
    } else {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="card w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Secure Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}