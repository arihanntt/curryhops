"use client";

import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import {
  PhotoIcon,
  TrashIcon,
  ArrowPathIcon,
  SparklesIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type BannerData = {
  isActive:    boolean;
  badgeText:   string;
  title:       string;
  description: string;
  imageUrl:    string;
  imageSize:   string;
  buttonText:  string;
  buttonLink:  string;
};

const DEFAULT: BannerData = {
  isActive:    false,
  badgeText:   "🍺 New Release",
  title:       "Something Special is Brewing",
  description: "Our craft kitchen has been working on something extraordinary. Come taste the difference — limited time only.",
  imageUrl:    "",
  imageSize:   "",
  buttonText:  "Explore the Menu",
  buttonLink:  "/menu",
};

function getCloudinaryUrl(url: string, width: number) {
  if (!url) return "";
  if (!url.includes("cloudinary.com")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

export default function PopupBannerEditor() {
  const [banner, setBanner]   = useState<BannerData>(DEFAULT);
  const [saving, setSaving]   = useState(false);
  const [saved,  setSaved]    = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch current banner data
  useEffect(() => {
    fetch("/api/banner", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setBanner({
            isActive:    data.isActive    ?? false,
            badgeText:   data.badgeText   ?? DEFAULT.badgeText,
            title:       data.title       ?? DEFAULT.title,
            description: data.description ?? DEFAULT.description,
            imageUrl:    data.imageUrl    ?? "",
            imageSize:   data.imageSize   ?? "",
            buttonText:  data.buttonText  ?? DEFAULT.buttonText,
            buttonLink:  data.buttonLink  ?? DEFAULT.buttonLink,
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const update = (field: keyof BannerData, value: any) =>
    setBanner((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/banner", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(banner),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading banner data…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ── Header ── */}
        <div className="border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Popup Banner</h1>
            <p className="text-slate-500 mt-1">
              Edit the announcement popup shown to visitors when they first open the site.
            </p>
          </div>

          {/* Active toggle pill */}
          <label className="flex items-center gap-3 cursor-pointer select-none self-start md:self-auto">
            <span className="text-sm font-semibold text-slate-600">
              {banner.isActive ? "Banner is LIVE" : "Banner is OFF"}
            </span>
            <div
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                banner.isActive ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                  banner.isActive ? "translate-x-6" : ""
                }`}
              />
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={banner.isActive}
              onChange={(e) => update("isActive", e.target.checked)}
            />
            {banner.isActive ? (
              <EyeIcon className="w-5 h-5 text-emerald-600" />
            ) : (
              <EyeSlashIcon className="w-5 h-5 text-slate-400" />
            )}
          </label>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── LEFT: FIELDS ── */}
          <div className="space-y-6">

            {/* Image Upload */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Banner Image
              </h2>
              <p className="text-xs text-slate-400">
                Appears on the left side of the popup. Cloudinary auto-compresses to WebP/AVIF.
              </p>

              {banner.imageUrl ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video group">
                  <Image
                    src={getCloudinaryUrl(banner.imageUrl, 800)}
                    alt="Banner preview"
                    fill
                    className="object-cover"
                    quality={75}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  {banner.imageSize && (
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {banner.imageSize}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <CldUploadWidget
                      uploadPreset="curryandhops_menu"
                      options={{ sources: ["local", "camera"], maxFiles: 1, maxFileSize: 5000000, clientAllowedFormats: ["image"] }}
                      onSuccess={(res: any) => {
                        update("imageUrl", res.info.secure_url);
                        update("imageSize", (res.info.bytes / 1024).toFixed(0) + " KB");
                        document.body.style.overflow = "auto";
                      }}
                      onClose={() => { document.body.style.overflow = "auto"; }}
                    >
                      {({ open }) => (
                        <button
                          onClick={() => open()}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white text-slate-800 rounded-lg text-sm font-bold shadow hover:bg-amber-50 transition-colors"
                        >
                          <ArrowPathIcon className="w-4 h-4" /> Change
                        </button>
                      )}
                    </CldUploadWidget>
                    <button
                      onClick={() => { update("imageUrl", ""); update("imageSize", ""); }}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-bold shadow hover:bg-red-600 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <CldUploadWidget
                  uploadPreset="curryandhops_menu"
                  options={{ sources: ["local", "camera"], maxFiles: 1, maxFileSize: 5000000, clientAllowedFormats: ["image"] }}
                  onSuccess={(res: any) => {
                    update("imageUrl", res.info.secure_url);
                    update("imageSize", (res.info.bytes / 1024).toFixed(0) + " KB");
                    document.body.style.overflow = "auto";
                  }}
                  onClose={() => { document.body.style.overflow = "auto"; }}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      className="w-full border-2 border-dashed border-slate-300 rounded-xl py-10 flex flex-col items-center gap-3 text-slate-400 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/50 transition-all"
                    >
                      <PhotoIcon className="w-10 h-10" />
                      <span className="font-bold text-sm">Click to upload image</span>
                      <span className="text-xs">Auto-compressed via Cloudinary</span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            {/* Text Fields */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Content</h2>

              <Field
                label="Badge Text"
                hint="Shown as a pill above the title (e.g. 🍺 New Release)"
                value={banner.badgeText}
                onChange={(v) => update("badgeText", v)}
                placeholder="🍺 New Release"
              />
              <Field
                label="Title"
                hint="Main headline of the popup"
                value={banner.title}
                onChange={(v) => update("title", v)}
                placeholder="Something Special is Brewing"
              />
              <Field
                label="Description"
                hint="Short body text below the title"
                value={banner.description}
                onChange={(v) => update("description", v)}
                placeholder="Tell customers what's new…"
                multiline
              />
            </div>

            {/* Button Fields */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Call-to-Action Button</h2>
              <Field
                label="Button Text"
                hint="Label shown on the CTA button"
                value={banner.buttonText}
                onChange={(v) => update("buttonText", v)}
                placeholder="Explore the Menu"
              />
              <Field
                label="Button Link"
                hint="Where should the button take the user?"
                value={banner.buttonLink}
                onChange={(v) => update("buttonLink", v)}
                placeholder="/menu"
              />
            </div>
          </div>

          {/* ── RIGHT: LIVE PREVIEW ── */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Live Preview</h2>
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-lg mx-auto ring-1 ring-slate-200">
                {/* Image side */}
                <div className="relative w-full md:w-[45%] h-40 md:h-auto bg-stone-800 shrink-0">
                  {banner.imageUrl ? (
                    <Image
                      src={getCloudinaryUrl(banner.imageUrl, 400)}
                      alt="Preview"
                      fill
                      className="object-cover"
                      quality={65}
                      sizes="200px"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-800 via-amber-900/40 to-stone-900">
                      <SparklesIcon className="w-12 h-12 text-amber-400/30" />
                    </div>
                  )}
                </div>

                {/* Content side */}
                <div className="bg-[#1a1410] text-[#f8f5f2] flex-1 px-5 py-6 flex flex-col justify-center gap-3">
                  {banner.badgeText && (
                    <span className="inline-flex items-center gap-1 self-start px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                      <SparklesIcon className="w-2.5 h-2.5" />
                      {banner.badgeText}
                    </span>
                  )}
                  <div className="text-base font-bold leading-snug" style={{ fontFamily: "Playfair Display, serif" }}>
                    {banner.title || <span className="text-stone-500 italic">Your title here…</span>}
                  </div>
                  {banner.description && (
                    <p className="text-xs text-stone-400 italic leading-relaxed line-clamp-3">
                      {banner.description}
                    </p>
                  )}
                  {banner.buttonText && (
                    <span className="self-start px-4 py-2 bg-amber-500 text-stone-900 font-bold text-[10px] tracking-widest uppercase rounded-full mt-1">
                      {banner.buttonText}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-center text-xs text-slate-400 mt-3 italic">Preview — actual popup is larger</p>

              {/* Status indicator */}
              <div className={`mt-4 mx-auto max-w-lg flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium ${
                banner.isActive
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}>
                {banner.isActive ? (
                  <><CheckCircleIcon className="w-4 h-4" /> Banner is LIVE — visitors will see this popup</>
                ) : (
                  <><EyeSlashIcon className="w-4 h-4" /> Banner is OFF — toggle to make it visible</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Save Bar ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-end pointer-events-auto">
          <div className={`flex items-center gap-4 px-6 py-3 rounded-full shadow-xl transition-all duration-500 border backdrop-blur-md ${
            saving ? "bg-slate-800 text-white border-slate-700" : "bg-white/90 border-slate-200 text-slate-800"
          }`}>
            {saved && (
              <span className="text-emerald-600 font-bold text-sm flex items-center gap-1">
                <CheckCircleIcon className="w-4 h-4" /> Saved!
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-300 text-sm active:scale-95 ${
                saving
                  ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-amber-500/30 hover:-translate-y-0.5"
              }`}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable field component ── */
function Field({
  label, hint, value, onChange, placeholder, multiline = false,
}: {
  label: string; hint?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  const base =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 outline-none transition-all placeholder:text-slate-300";
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
      {multiline ? (
        <textarea
          className={`${base} resize-none min-h-[100px]`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
