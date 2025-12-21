"use client";
import { useState } from "react";

export default function AdminMenuPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("pdf") as HTMLInputElement;

    if (!fileInput?.files?.[0]) {
      setError("No file selected");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("pdf", fileInput.files[0]);

    try {
      const res = await fetch("/api/admin/upload-pdf", {
        method: "POST",
        body: formData,
      });

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse error
      }

      console.log("UPLOAD RESPONSE:", {
        status: res.status,
        ok: res.ok,
        data,
      });

      if (!res.ok) {
        setError(
          data?.error
            ? `Upload failed: ${data.error}`
            : `Upload failed (status ${res.status})`
        );
      } else {
        setMessage("Menu PDF updated successfully ✅");
      }
    } catch (err) {
      console.error("CLIENT UPLOAD ERROR:", err);
      setError("Network or server error during upload");
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <div className="max-w-lg mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin – Upload Menu PDF
      </h1>

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
          className="bg-black text-white px-6 py-3 rounded w-full disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-green-600 font-medium">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}
