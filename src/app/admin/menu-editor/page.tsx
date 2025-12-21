"use client";
import { useEffect, useState } from "react";

export default function MenuEditor() {
  const [menu, setMenu] = useState<any>(null);
const [saving, setSaving] = useState(false);
const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then(setMenu);
  }, []);

  if (!menu) return <p className="p-10 text-gray-400">Loading…</p>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-8">Menu Editor</h1>

      {menu.sections.map((section: any, si: number) => (
        <div
          key={si}
          className="mb-10 rounded-xl border border-gray-800 p-6"
        >
          <h2 className="text-xl font-semibold mb-4 text-amber-400">
            {section.title}
          </h2>

          {section.items.map((item: any, ii: number) => (
            <div
              key={ii}
              className="grid grid-cols-4 gap-3 mb-3"
            >
              <input
                className="bg-gray-900 border border-gray-700 p-2 rounded"
                value={item.name}
                placeholder="Name"
                onChange={(e) => {
                  item.name = e.target.value;
                  setMenu({ ...menu });
                }}
              />
              <input
                className="bg-gray-900 border border-gray-700 p-2 rounded"
                value={item.price}
                placeholder="Price"
                onChange={(e) => {
                  item.price = e.target.value;
                  setMenu({ ...menu });
                }}
              />
              <input
                className="bg-gray-900 border border-gray-700 p-2 rounded"
                value={item.desc}
                placeholder="Description"
                onChange={(e) => {
                  item.desc = e.target.value;
                  setMenu({ ...menu });
                }}
              />
              <button
                onClick={() => {
                  section.items.splice(ii, 1);
                  setMenu({ ...menu });
                }}
                className="text-red-400 hover:text-red-500"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              section.items.push({ name: "", price: "", desc: "" });
              setMenu({ ...menu });
            }}
            className="mt-3 text-sm text-amber-400"
          >
            + Add Item
          </button>
        </div>
      ))}

      <button
  onClick={async () => {
    setSaving(true);
    setSaved(false);

    await fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(menu),
    });

    setSaving(false);
    setSaved(true);

    setTimeout(() => setSaved(false), 3000);
  }}
  className="mt-6 bg-amber-500 text-black px-8 py-3 rounded-lg"
>
  {saving ? "Saving..." : "Save Menu"}
</button>
{saved && (
  <p className="mt-4 text-green-400">
    ✅ Menu saved successfully
  </p>
)}

    </div>
  );
}
