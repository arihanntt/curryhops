"use client";
import { useEffect, useState } from "react";

export default function MenuEditor() {
  const [menu, setMenu] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuType, setMenuType] = useState<"food" | "bar">("food");

  useEffect(() => {
    fetch("/api/menu")
      .then(r => r.json())
      .then(data => {
        setMenu(data);
      })
      .catch(err => console.error("Failed to load menu:", err));
  }, []);

  if (!menu) return <p className="p-10 text-gray-400">Loading menu...</p>;

  const filteredSections = menu.sections?.filter(
    (s: any) => s.menuType?.toLowerCase() === menuType
  ) || [];

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sections: menu.sections   // ← Only send sections!
        }),
      });

      if (!res.ok) throw new Error("Save failed");
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save menu");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Menu Editor</h1>

      {/* Toggle */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setMenuType("food")}
          className={`px-6 py-2 rounded border ${
            menuType === "food"
              ? "bg-amber-500 text-black font-semibold"
              : "border-gray-700 text-gray-300 hover:border-gray-500"
          }`}
        >
          Food Menu
        </button>
        <button
          onClick={() => setMenuType("bar")}
          className={`px-6 py-2 rounded border ${
            menuType === "bar"
              ? "bg-amber-500 text-black font-semibold"
              : "border-gray-700 text-gray-300 hover:border-gray-500"
          }`}
        >
          Bar Menu
        </button>
      </div>

      {/* Sections */}
      {filteredSections.length === 0 && (
        <p className="text-yellow-400 mb-6">
          No sections found for {menuType.toUpperCase()}. Check database structure.
        </p>
      )}

      {filteredSections.map((section: any, si: number) => (
        <div
          key={section.id || si}
          className="mb-10 rounded-xl border border-gray-800 p-6 bg-gray-950/50"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold text-amber-400">
              {section.title}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                {section.menuType?.toUpperCase() || "MISSING MENU TYPE!!!"}
              </span>
            </div>
          </div>

          {/* Items */}
          {section.items.map((item: any, ii: number) => (
            <div key={ii} className="grid grid-cols-4 gap-3 mb-4 items-start">
              <input
                className="bg-gray-900 border border-gray-700 p-3 rounded w-full"
                value={item.name || ""}
                placeholder="Item name"
                onChange={e => {
                  const newSections = [...menu.sections];
                  newSections
                    .find(s => s.id === section.id)!
                    .items[ii].name = e.target.value;
                  setMenu({ ...menu, sections: newSections });
                }}
              />
              <input
                className="bg-gray-900 border border-gray-700 p-3 rounded w-full"
                value={item.price || ""}
                placeholder="Price (₹)"
                onChange={e => {
                  const newSections = [...menu.sections];
                  newSections
                    .find(s => s.id === section.id)!
                    .items[ii].price = e.target.value;
                  setMenu({ ...menu, sections: newSections });
                }}
              />
              <input
                className="bg-gray-900 border border-gray-700 p-3 rounded w-full"
                value={item.desc || ""}
                placeholder="Description"
                onChange={e => {
                  const newSections = [...menu.sections];
                  newSections
                    .find(s => s.id === section.id)!
                    .items[ii].desc = e.target.value;
                  setMenu({ ...menu, sections: newSections });
                }}
              />
              <button
                onClick={() => {
                  const newSections = [...menu.sections];
                  newSections
                    .find(s => s.id === section.id)!
                    .items.splice(ii, 1);
                  setMenu({ ...menu, sections: newSections });
                }}
                className="text-red-400 hover:text-red-500 font-medium"
              >
                Delete
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              const newSections = [...menu.sections];
              newSections
                .find(s => s.id === section.id)!
                .items.push({ name: "", price: "", desc: "" });
              setMenu({ ...menu, sections: newSections });
            }}
            className="mt-4 text-sm text-amber-400 hover:text-amber-300"
          >
            + Add Item
          </button>
        </div>
      ))}

      {/* Save */}
      <div className="mt-12 flex flex-col items-start gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-10 py-4 rounded-lg font-semibold ${
            saving
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-black"
          }`}
        >
          {saving ? "Saving..." : "Save Menu"}
        </button>

        {saved && (
          <p className="text-green-400 font-medium">✓ Menu saved successfully!</p>
        )}
      </div>
    </div>
  );
}