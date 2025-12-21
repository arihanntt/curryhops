"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setError("Incorrect password");
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Admin Login
        </h1>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="
            w-full rounded-lg border border-gray-300
            px-4 py-3 mb-3
            text-gray-900 bg-white
            focus:outline-none focus:ring-2 focus:ring-amber-500
          "
        />

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <button
          onClick={login}
          className="w-full rounded-full bg-amber-500 py-3 font-bold text-black"
        >
          Login
        </button>

      </div>
    </div>
  );
}
