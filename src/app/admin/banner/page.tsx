"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { PhotoIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function AdminBannerPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [currentBanner, setCurrentBanner] = useState<string | null>(null);

  // Fetch current banner on load
  useEffect(() => {
    fetch("/api/banner")
      .then((res) => res.json())
      .then((data) => {
        if (data?.imageUrl) {
          setCurrentBanner(data.imageUrl);
        }
      })
      .catch(() => setMsg("❌ Failed to load current banner"));
  }, []);

  // Function to save the URL to your database after Cloudinary upload
  const saveBannerToDb = async (url: string) => {
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch("/api/admin/upload-banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: url }),
      });

      if (res.ok) {
        setCurrentBanner(url);
        setMsg("✅ Banner updated successfully!");
      } else {
        setMsg("❌ Database save failed");
      }
    } catch {
      setMsg("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Homepage Banner</h1>
        <p className="text-gray-400 mb-8">Manage the large hero image displayed on the home page.</p>

        {/* Current Banner Preview */}
        <div className="mb-10">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Current Active Banner</p>
          
          <div className="relative w-full aspect-[6.4/1] border border-gray-800 rounded-2xl overflow-hidden bg-[#0f0f0f] shadow-2xl">
            {currentBanner ? (
              <Image
                src={currentBanner}
                alt="Current Banner"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-700">
                No banner set
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-lg">
          <div className="bg-[#0f0f0f] border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Update Banner</h3>
            <p className="text-sm text-gray-400 mb-6">
              Upload a high-quality image. The cropper will automatically lock to the required <b>6.4:1</b> ratio.
            </p>

            <CldUploadWidget
              uploadPreset="curryandhops_banner" // 👈 UPDATED PRESET NAME
              options={{
                sources: ['local', 'unsplash'], 
                multiple: false,
                maxFileSize: 10000000, 
                clientAllowedFormats: ['image'],
                
                // ✂️ MAGIC CROP CONFIGURATION
                cropping: true,
                croppingAspectRatio: 6.4, 
                showSkipCropButton: false, 
                
                // ❌ REMOVED the 'transformation' line to fix the red error.
                // The resizing (1920px) is now handled by your 'curryandhops_banner' preset in Cloudinary.
              }}
              onSuccess={(result: any) => {
                const url = result.info.secure_url;
                saveBannerToDb(url);
                document.body.style.overflow = "auto"; // Fix stuck scroll
              }}
              onClose={() => { 
                document.body.style.overflow = "auto"; // Fix stuck scroll
              }}
            >
              {({ open }) => (
                <button
                  onClick={() => open()}
                  disabled={loading}
                  className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      {currentBanner ? <ArrowPathIcon className="w-5 h-5"/> : <PhotoIcon className="w-5 h-5"/>}
                      {currentBanner ? "Change Banner" : "Upload Banner"}
                    </>
                  )}
                </button>
              )}
            </CldUploadWidget>

            {msg && (
              <div className={`mt-4 p-3 rounded-lg text-sm font-bold text-center ${msg.includes("✅") ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {msg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}