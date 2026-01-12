"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Bars3Icon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

const FOOD_TAGS = [
  { id: "Non-Veg", label: "Non-Veg", color: "text-red-400 bg-red-950/40" },
  { id: "Egg", label: "Egg", color: "text-yellow-400 bg-yellow-950/40" },
  { id: "Spicy", label: "Spicy", color: "text-orange-400 bg-orange-950/40" },
  { id: "Kids", label: "Kids", color: "text-blue-400 bg-blue-950/40" },
  { id: "Vegan", label: "Vegan", color: "text-green-400 bg-green-950/40" },
];

export default function MenuEditor() {
  const [menu, setMenu] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuType, setMenuType] = useState<"food" | "bar">("food");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        let updatedMenu = { ...data };

        const defaultBarIds = [
          "signature-cocktails",
          "classics",
          "liits",
          "beer-cocktails",
          "coffee",
          "hot-cocktails",
          "rum",
          "gin",
          "vodka",
          "tequila",
          "indian-whisky",
          "indian-single-malts",
          "scotch",
          "japanese-whisky",
          "rye-bourbon",
          "canadian-irish",
          "cognac-brandy",
          "liquers",
          "aperitif",
          "red-wine",
          "rose-sparkling",
          "white-wine",
          "sangria",
          "champagne",
          "shots",
          "fresh-juices",
          "soft-drinks",
        ];

        const existingIds = new Set(updatedMenu.sections.map((s: any) => s.id));
        const missing = defaultBarIds.filter((id) => !existingIds.has(id));

        if (missing.length > 0) {
          const missingSections = missing.map((id) => ({
            id,
            title: id
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
            menuType: "bar",
            items: [],
          }));
          updatedMenu.sections.push(...missingSections);
        }

        setMenu(updatedMenu);
      })
      .catch((err) => console.error("Failed to load menu:", err));
  }, []);

  if (!menu) return <p className="p-10 text-gray-400">Loading menu...</p>;

  const filteredSections = menu?.sections?.filter(
    (s: any) => s.menuType?.toLowerCase() === menuType.toLowerCase()
  ) || [];

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: menu.sections }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Save failed: ${errText}`);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);

      const fresh = await fetch("/api/menu").then((r) => r.json());
      setMenu(fresh);
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save – check console");
    } finally {
      setSaving(false);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const currentSections = [...menu.sections];
    const filtered = currentSections.filter(
      (s: any) => s.menuType?.toLowerCase() === menuType.toLowerCase()
    );

    const [moved] = filtered.splice(result.source.index, 1);
    filtered.splice(result.destination.index, 0, moved);

    const newSections = currentSections.filter(
      (s: any) => s.menuType?.toLowerCase() !== menuType.toLowerCase()
    );
    newSections.push(...filtered);

    setMenu({ ...menu, sections: newSections });

    // Auto-save order silently
    fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sections: newSections }),
    }).catch((err) => console.error("Auto-save failed:", err));
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const toggleTag = (sectionId: string, itemIndex: number, tagId: string) => {
    const newSections = [...menu.sections];
    const section = newSections.find((s) => s.id === sectionId);
    if (!section) return;

    const item = section.items[itemIndex];
    if (!item) return;

    const currentTags = item.tags || [];
    let newTags: string[];

    if (currentTags.includes(tagId)) {
      newTags = currentTags.filter((t: string) => t !== tagId);
    } else {
      newTags = [...currentTags, tagId];
    }

    item.tags = newTags;
    setMenu({ ...menu, sections: newSections });
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Menu Editor</h1>

      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setMenuType("food")}
          className={`px-6 py-2 rounded border ${
            menuType === "food" ? "bg-amber-500 text-black font-semibold" : "border-gray-700 text-gray-300 hover:border-gray-500"
          }`}
        >
          Food Menu
        </button>
        <button
          onClick={() => setMenuType("bar")}
          className={`px-6 py-2 rounded border ${
            menuType === "bar" ? "bg-amber-500 text-black font-semibold" : "border-gray-700 text-gray-300 hover:border-gray-500"
          }`}
        >
          Bar Menu
        </button>
      </div>

      {filteredSections.length === 0 && (
        <p className="text-yellow-400 mb-6">No sections found for {menuType.toUpperCase()}.</p>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={menuType}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {filteredSections.map((section: any, si: number) => {
                const sectionId = section.id || si.toString();
                const isExpanded = expandedSections.has(sectionId);

                return (
                  <Draggable key={sectionId} draggableId={sectionId} index={si}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="rounded-xl border border-gray-800 bg-gray-950/80 hover:bg-gray-950 transition-colors"
                      >
                        <div
                          className="flex items-center justify-between p-4 cursor-pointer"
                          onClick={() => toggleSection(sectionId)}
                        >
                          <div className="flex items-center gap-4">
                            <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                              <Bars3Icon className="h-8 w-8 text-gray-500 hover:text-amber-400 transition-colors" />
                            </div>
                            <h2 className="text-xl font-semibold text-amber-400">
                              {section.title}
                            </h2>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300">
                              {section.menuType?.toUpperCase() || "MISSING"}
                            </span>
                            {isExpanded ? (
                              <ChevronUpIcon className="h-6 w-6 text-gray-400" />
                            ) : (
                              <ChevronDownIcon className="h-6 w-6 text-gray-400" />
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-6 pb-6 animate-fade-in">
                            {section.items.map((item: any, ii: number) => (
                              <div
                                key={ii}
                                className="grid md:grid-cols-7 gap-3 mb-6 pb-4 border-b border-gray-800 last:border-0 items-start"
                              >
                                {/* Name */}
                                <input
                                  className="bg-gray-900 border border-gray-700 p-3 rounded w-full md:col-span-2"
                                  value={item.name || ""}
                                  placeholder="Item name"
                                  onChange={(e) => {
                                    const newSections = [...menu.sections];
                                    newSections
                                      .find((s) => s.id === section.id)!
                                      .items[ii].name = e.target.value;
                                    setMenu({ ...menu, sections: newSections });
                                  }}
                                />

                                {/* Price */}
                                {menuType === "bar" && item.showBottlePeg ? (
                                  <div className="opacity-50 pointer-events-none">
                                    <input
                                      disabled
                                      className="bg-gray-800 border border-gray-700 p-3 rounded w-full cursor-not-allowed"
                                      value={item.price || ""}
                                      placeholder="Normal Price (disabled)"
                                    />
                                  </div>
                                ) : (
                                  <input
                                    className="bg-gray-900 border border-gray-700 p-3 rounded w-full"
                                    value={item.price || ""}
                                    placeholder="Normal Price (₹)"
                                    onChange={(e) => {
                                      const newSections = [...menu.sections];
                                      newSections
                                        .find((s) => s.id === section.id)!
                                        .items[ii].price = e.target.value;
                                      setMenu({ ...menu, sections: newSections });
                                    }}
                                  />
                                )}

                                {/* Description */}
                                <input
                                  className="bg-gray-900 border border-gray-700 p-3 rounded w-full md:col-span-2"
                                  value={item.desc || ""}
                                  placeholder="Description / ingredients"
                                  onChange={(e) => {
                                    const newSections = [...menu.sections];
                                    newSections
                                      .find((s) => s.id === section.id)!
                                      .items[ii].desc = e.target.value;
                                    setMenu({ ...menu, sections: newSections });
                                  }}
                                />

                                {/* Dish Image URL – NEW FIELD */}
                                <input
                                  className="bg-gray-900 border border-gray-700 p-3 rounded w-full text-sm md:col-span-1"
                                  value={item.imageUrl || ""}
                                  placeholder="Image URL (optional)"
                                  onChange={(e) => {
                                    const newSections = [...menu.sections];
                                    newSections
                                      .find((s) => s.id === section.id)!
                                      .items[ii].imageUrl = e.target.value.trim();
                                    setMenu({ ...menu, sections: newSections });
                                  }}
                                />

                                {/* Tags – only for food menu */}
                                {menuType === "food" ? (
                                  <div className="flex flex-wrap gap-2 items-center md:col-span-1">
                                    {FOOD_TAGS.map((tag) => (
                                      <label
                                        key={tag.id}
                                        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md cursor-pointer text-sm transition-colors border ${
                                          (item.tags || []).includes(tag.id)
                                            ? `${tag.color} border-current`
                                            : "border-gray-700 text-gray-400 hover:border-gray-500"
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={(item.tags || []).includes(tag.id)}
                                          onChange={() => toggleTag(section.id, ii, tag.id)}
                                          className="sr-only"
                                        />
                                        {tag.label}
                                      </label>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="invisible"> </div>
                                )}

                                {/* Bottle + Peg toggle (bar only) */}
                                {menuType === "bar" && (
                                  <div className="flex items-center justify-center md:col-span-1">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={item.showBottlePeg || false}
                                        onChange={(e) => {
                                          const newSections = [...menu.sections];
                                          const targetItem = newSections
                                            .find((s) => s.id === section.id)!
                                            .items[ii];

                                          targetItem.showBottlePeg = e.target.checked;

                                          if (!e.target.checked) {
                                            targetItem.bottlePrice = "";
                                            targetItem.pegPrice = "";
                                          }

                                          setMenu({ ...menu, sections: newSections });
                                        }}
                                        className="w-5 h-5 accent-amber-500"
                                      />
                                      <span className="text-sm text-amber-400 font-medium">Bottle + Peg</span>
                                    </label>
                                  </div>
                                )}

                                {/* Delete */}
                                <button
                                  onClick={() => {
                                    const newSections = [...menu.sections];
                                    newSections
                                      .find((s) => s.id === section.id)!
                                      .items.splice(ii, 1);
                                    setMenu({ ...menu, sections: newSections });
                                  }}
                                  className="text-red-400 hover:text-red-500 font-medium self-center md:self-start"
                                >
                                  Delete
                                </button>

                                {/* Bottle & Peg prices */}
                                {menuType === "bar" && item.showBottlePeg && (
                                  <div className="col-span-full grid grid-cols-2 gap-4 mt-3">
                                    <input
                                      className="bg-gray-900 border border-gray-700 p-3 rounded w-full"
                                      value={item.bottlePrice || ""}
                                      placeholder="Bottle Price (₹)"
                                      onChange={(e) => {
                                        const newSections = [...menu.sections];
                                        newSections
                                          .find((s) => s.id === section.id)!
                                          .items[ii].bottlePrice = e.target.value;
                                        setMenu({ ...menu, sections: newSections });
                                      }}
                                    />
                                    <input
                                      className="bg-gray-900 border border-gray-700 p-3 rounded w-full"
                                      value={item.pegPrice || ""}
                                      placeholder="30ml / Peg Price (₹)"
                                      onChange={(e) => {
                                        const newSections = [...menu.sections];
                                        newSections
                                          .find((s) => s.id === section.id)!
                                          .items[ii].pegPrice = e.target.value;
                                        setMenu({ ...menu, sections: newSections });
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}

                            <button
                              onClick={() => {
                                const newSections = [...menu.sections];
                                const newItem = {
                                  name: "",
                                  price: "",
                                  desc: "",
                                  tags: [],
                                  imageUrl: "", // ← NEW: initialize empty
                                  showBottlePeg: false,
                                  bottlePrice: "",
                                  pegPrice: "",
                                };
                                newSections
                                  .find((s) => s.id === section.id)!
                                  .items.push(newItem);
                                setMenu({ ...menu, sections: newSections });
                              }}
                              className="mt-4 text-sm text-amber-400 hover:text-amber-300"
                            >
                              + Add Item
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="mt-12 flex flex-col items-start gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-10 py-4 rounded-lg font-semibold ${
            saving ? "bg-gray-600 cursor-not-allowed" : "bg-amber-500 hover:bg-amber-600 text-black"
          }`}
        >
          {saving ? "Saving..." : "Save Menu"}
        </button>

        {saved && <p className="text-green-400 font-medium">✓ Menu saved successfully!</p>}
      </div>
    </div>
  );
}