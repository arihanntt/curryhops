"use client";

import { useState } from "react";

export default function AdminMenuPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg("");

    const form = e.currentTarget;
    const input = form.elements.namedItem("pdf") as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      setMsg("❌ Please select a PDF first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", input.files[0]);

    const res = await fetch("/api/admin/upload-pdf", {
      method: "POST",
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      setMsg("✅ Menu PDF updated successfully");
      form.reset();
    } else {
      setMsg("❌ Upload failed");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Upload Menu PDF</h1>

      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded w-full"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      {msg && <p className="mt-4">{msg}</p>}
    </div>
  );
}
