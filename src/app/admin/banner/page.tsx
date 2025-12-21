"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function AdminBannerPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentBanner, setCurrentBanner] = useState<string | null>(null);

  // Fetch current banner
  useEffect(() => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        if (data?.imageUrl) {
          setCurrentBanner(data.imageUrl);
        }
      })
      .catch(() => {
        setMsg("❌ Failed to load current banner");
      });
  }, []);

  async function uploadBanner(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setMsg("");

    const form = e.currentTarget;
    const fileInput = form.elements.namedItem("banner") as HTMLInputElement;

    if (!fileInput.files || !fileInput.files[0]) {
      setMsg("❌ Please select an image");
      return;
    }

    const file = fileInput.files[0];

    // Validate image ratio before upload
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = async () => {
      const ratio = img.width / img.height;

      // Enforce ~6.4 : 1 ratio
      if (ratio < 6.2 || ratio > 6.6) {
        setMsg(
          "❌ Invalid banner size. Please upload a wide banner (~6.4:1). Example: 1536×240 or 1920×300."
        );
        URL.revokeObjectURL(objectUrl);
        return;
      }

      URL.revokeObjectURL(objectUrl);
      setLoading(true);

      const formData = new FormData();
      formData.append("banner", file);

      try {
        const res = await fetch("/api/admin/upload-banner", {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          setCurrentBanner(data.imageUrl);
          setMsg("✅ Banner updated successfully");
          form.reset();
        } else {
          setMsg("❌ Upload failed");
        }
      } catch {
        setMsg("❌ Upload error");
      }

      setLoading(false);
    };

    img.onerror = () => {
      setMsg("❌ Failed to read image file");
      URL.revokeObjectURL(objectUrl);
      setLoading(false);
    };
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Homepage Banner</h1>

      {/* Current Banner Preview */}
      {currentBanner && (
        <div className="mb-8">
          <p className="text-gray-400 mb-2">Current banner:</p>
          <div className="relative w-full max-w-5xl aspect-[32/5] border border-gray-800 rounded-lg overflow-hidden">
            <Image
              src={currentBanner}
              alt="Current Banner"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Upload Form */}
      <form
        onSubmit={uploadBanner}
        className="max-w-md border border-gray-800 rounded-xl p-6 bg-[#0f0f0f]"
      >
        <label className="block text-sm text-gray-400 mb-2">
          Upload new banner (≈ 6.4 : 1 ratio)
        </label>

        <input
          type="file"
          name="banner"
          accept="image/*"
          className="mb-4 text-gray-300"
        />

        <p className="text-xs text-gray-500 mb-4">
          Required ratio: <b>~6.4:1</b>
          <br />
          Examples: 1536×240, 1920×300, 2560×400
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-black py-3 rounded-lg transition"
        >
          {loading ? "Uploading..." : "Upload Banner"}
        </button>

        {msg && <p className="mt-4 text-sm text-gray-300">{msg}</p>}
      </form>
    </div>
  );
}
