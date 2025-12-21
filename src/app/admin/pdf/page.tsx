"use client";
import { useState } from "react";

export default function AdminPdfPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function uploadPdf(e: any) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    const formData = new FormData();
    formData.append("pdf", e.target.pdf.files[0]);

    const res = await fetch("/api/admin/upload-pdf", {
      method: "POST",
      body: formData,
    });

    setLoading(false);
    setMsg(res.ok ? "✅ PDF updated successfully" : "❌ Upload failed");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">
        Upload Menu PDF
      </h1>

      <form className="max-w-md border border-gray-800 rounded-xl p-6">
        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          required
          className="mb-4 text-gray-300"
        />

        <button
          disabled={loading}
          onClick={uploadPdf}
          className="w-full bg-amber-500 text-black py-3 rounded-lg"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>

        {msg && <p className="mt-4 text-gray-300">{msg}</p>}
      </form>
    </div>
  );
}
