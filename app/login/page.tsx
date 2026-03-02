"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.message) {
      localStorage.setItem("user", form.email);

      alert("Login Successful");

      router.push("/");
      router.refresh();
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center mt-24">
      <div className="card w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Secure Login
        </h2>

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
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}