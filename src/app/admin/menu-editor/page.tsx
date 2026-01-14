"use client";
import { useEffect, useState } from "react";
// Using the fix or the standard library
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { 
  Bars3Icon, 
  ChevronDownIcon, 
  TrashIcon, 
  PhotoIcon,
  CurrencyRupeeIcon,
  DocumentTextIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

// UPDATED TAGS FOR LIGHT MODE VISIBILITY
const FOOD_TAGS = [
  { id: "Non-Veg", label: "Non-Veg", color: "text-red-600 bg-red-50 border-red-200 ring-red-500/30" },
  { id: "Egg", label: "Egg", color: "text-yellow-600 bg-yellow-50 border-yellow-200 ring-yellow-500/30" },
  { id: "Spicy", label: "Spicy", color: "text-orange-600 bg-orange-50 border-orange-200 ring-orange-500/30" },
  { id: "Kids", label: "Kids", color: "text-blue-600 bg-blue-50 border-blue-200 ring-blue-500/30" },
  { id: "Vegan", label: "Vegan", color: "text-green-600 bg-green-50 border-green-200 ring-green-500/30" },
];

export default function MenuEditor() {
  const [menu, setMenu] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [menuType, setMenuType] = useState<"food" | "bar">("food");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  // STRICT MODE FIX for DnD
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    fetch("/api/menu")
      .then((r) => r.json())
      .then((data) => {
        let updatedMenu = { ...data };
        // Ensure unique IDs
        updatedMenu.sections = updatedMenu.sections.map((s: any, index: number) => ({
           ...s,
           id: s.id || `section-${Date.now()}-${index}` 
        }));
        
        // Add missing sections logic (kept from your original code)
        const defaultBarIds = [
            "signature-cocktails", "classics", "liits", "beer-cocktails", "coffee",
            "hot-cocktails", "rum", "gin", "vodka", "tequila", "indian-whisky",
            "indian-single-malts", "scotch", "japanese-whisky", "rye-bourbon",
            "canadian-irish", "cognac-brandy", "liquers", "aperitif", "red-wine",
            "rose-sparkling", "white-wine", "sangria", "champagne", "shots",
            "fresh-juices", "soft-drinks",
        ];
        const existingIds = new Set(updatedMenu.sections.map((s: any) => s.id));
        const missing = defaultBarIds.filter((id) => !existingIds.has(id));
        if (missing.length > 0) {
            const missingSections = missing.map((id) => ({
                id,
                title: id.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
                menuType: "bar",
                items: [],
            }));
            updatedMenu.sections.push(...missingSections);
        }

        setMenu(updatedMenu);
      })
      .catch((err) => console.error("Failed to load menu:", err));
  }, []);

  if (!menu) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading Menu...</p>
      </div>
    </div>
  );

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

      if (!res.ok) throw new Error("Save failed");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      const fresh = await fetch("/api/menu").then((r) => r.json());
      setMenu(fresh);
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const currentSections = [...menu.sections];
    
    // Logic to handle reordering within the filtered view but updating the main array
    const filtered = currentSections.filter((s: any) => s.menuType?.toLowerCase() === menuType.toLowerCase());
    const [moved] = filtered.splice(result.source.index, 1);
    filtered.splice(result.destination.index, 0, moved);

    const others = currentSections.filter((s: any) => s.menuType?.toLowerCase() !== menuType.toLowerCase());
    const newSections = [...others, ...filtered];

    setMenu({ ...menu, sections: newSections });
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) newExpanded.delete(sectionId);
    else newExpanded.add(sectionId);
    setExpandedSections(newExpanded);
  };

  const toggleTag = (sectionId: string, itemIndex: number, tagId: string) => {
    const newSections = [...menu.sections];
    const section = newSections.find((s: any) => s.id === sectionId);
    if (!section) return;
    const item = section.items[itemIndex];
    const currentTags = item.tags || [];
    item.tags = currentTags.includes(tagId) 
        ? currentTags.filter((t: string) => t !== tagId) 
        : [...currentTags, tagId];
    setMenu({ ...menu, sections: newSections });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-32 relative selection:bg-amber-100">
      
      {/* Background Decor */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Menu Editor</h1>
            <p className="text-slate-500 mt-1">Organize your sections and update item details.</p>
          </div>

          {/* SaaS Style Toggle */}
          <div className="bg-slate-200/80 p-1 rounded-xl flex gap-1 border border-slate-200 shadow-inner">
            <button
              onClick={() => setMenuType("food")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                menuType === "food" 
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Food Menu
            </button>
            <button
              onClick={() => setMenuType("bar")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                menuType === "bar" 
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Bar Menu
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredSections.length === 0 && (
          <div className="text-center py-20 rounded-3xl border-2 border-dashed border-slate-200 bg-white/50">
            <p className="text-slate-400 font-medium">No sections found for {menuType.toUpperCase()}.</p>
          </div>
        )}

        {enabled ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={menuType}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {filteredSections.map((section: any, si: number) => {
                    const sectionId = section.id;
                    const isExpanded = expandedSections.has(sectionId);

                    return (
                      <Draggable key={sectionId} draggableId={sectionId} index={si}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`
                              rounded-2xl border transition-all duration-300
                              ${snapshot.isDragging 
                                  ? "bg-white border-amber-400 shadow-2xl scale-[1.02] z-50 ring-2 ring-amber-100" 
                                  : "bg-white border-slate-200 hover:border-amber-200 hover:shadow-md"
                              }
                            `}
                          >
                            {/* Section Header */}
                            <div
                              className="flex items-center justify-between p-4 cursor-default group"
                              onClick={(e) => {
                                if((e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'BUTTON') {
                                    toggleSection(sectionId)
                                }
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <div 
                                  {...provided.dragHandleProps} 
                                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-amber-600 transition-colors cursor-grab active:cursor-grabbing"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Bars3Icon className="h-6 w-6" />
                                </div>
                                
                                <div className="cursor-pointer" onClick={() => toggleSection(sectionId)}>
                                  <h2 className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                                    {section.title}
                                  </h2>
                                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded mt-0.5 inline-block">
                                    {section.menuType}
                                  </span>
                                </div>
                              </div>

                              <button 
                                onClick={() => toggleSection(sectionId)}
                                className={`p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-all duration-300 ${isExpanded ? "rotate-180 bg-slate-100 text-slate-700" : ""}`}
                              >
                                 <ChevronDownIcon className="h-5 w-5" />
                              </button>
                            </div>

                            {/* Expanded Content */}
                            {isExpanded && (
                              <div className="p-4 pt-0">
                                <div className="space-y-3 bg-slate-50/50 rounded-xl p-4 border border-slate-100">
                                  {section.items.map((item: any, ii: number) => (
                                    <div
                                      key={ii}
                                      className="grid md:grid-cols-12 gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm relative group/item hover:border-amber-200 transition-colors"
                                    >
                                      {/* Name */}
                                      <div className="md:col-span-3">
                                          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Item Name</label>
                                          <input
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
                                            value={item.name || ""}
                                            placeholder="Item name"
                                            onChange={(e) => {
                                              const newSections = [...menu.sections];
                                              newSections.find((s) => s.id === sectionId)!.items[ii].name = e.target.value;
                                              setMenu({ ...menu, sections: newSections });
                                            }}
                                          />
                                      </div>

                                      {/* Description */}
                                      <div className="md:col-span-4">
                                          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Description</label>
                                          <div className="relative">
                                            <input
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-600 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                                value={item.desc || ""}
                                                placeholder="Ingredients..."
                                                onChange={(e) => {
                                                const newSections = [...menu.sections];
                                                newSections.find((s) => s.id === sectionId)!.items[ii].desc = e.target.value;
                                                setMenu({ ...menu, sections: newSections });
                                                }}
                                            />
                                            <DocumentTextIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                          </div>
                                      </div>

                                      {/* Price */}
                                      <div className="md:col-span-2">
                                          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Price</label>
                                          {menuType === "bar" && item.showBottlePeg ? (
                                             <div className="h-[38px] flex items-center justify-center px-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 text-slate-400 text-xs italic">
                                                Complex Pricing
                                             </div>
                                          ) : (
                                            <div className="relative">
                                                <input
                                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-800 text-sm font-mono focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                                  value={item.price || ""}
                                                  placeholder="00"
                                                  onChange={(e) => {
                                                    const newSections = [...menu.sections];
                                                    newSections.find((s) => s.id === sectionId)!.items[ii].price = e.target.value;
                                                    setMenu({ ...menu, sections: newSections });
                                                  }}
                                                />
                                                <CurrencyRupeeIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                            </div>
                                          )}
                                      </div>

                                      {/* Image URL */}
                                      <div className="md:col-span-2">
                                          <label className="text-[10px] uppercase font-bold text-slate-400 ml-1">Image</label>
                                          <div className="relative">
                                            <input
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-600 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all truncate"
                                                value={item.imageUrl || ""}
                                                placeholder="https://..."
                                                onChange={(e) => {
                                                const newSections = [...menu.sections];
                                                newSections.find((s) => s.id === sectionId)!.items[ii].imageUrl = e.target.value.trim();
                                                setMenu({ ...menu, sections: newSections });
                                                }}
                                            />
                                            <PhotoIcon className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                                          </div>
                                      </div>

                                       {/* Delete */}
                                       <div className="md:col-span-1 flex items-end justify-center pb-1">
                                          <button
                                            onClick={() => {
                                              const newSections = [...menu.sections];
                                              newSections.find((s) => s.id === sectionId)!.items.splice(ii, 1);
                                              setMenu({ ...menu, sections: newSections });
                                            }}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                          >
                                            <TrashIcon className="h-5 w-5" />
                                          </button>
                                       </div>

                                      {/* Tags / Extras */}
                                      <div className="md:col-span-12 pt-2 border-t border-slate-100 flex flex-wrap gap-4 items-center">
                                          {menuType === "food" && (
                                              <div className="flex flex-wrap gap-2">
                                                  {FOOD_TAGS.map((tag) => {
                                                      const isSelected = (item.tags || []).includes(tag.id);
                                                      return (
                                                          <button
                                                              key={tag.id}
                                                              onClick={() => toggleTag(sectionId, ii, tag.id)}
                                                              className={`
                                                                  px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200
                                                                  ${isSelected 
                                                                    ? `${tag.color} ring-1` 
                                                                    : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"}
                                                              `}
                                                          >
                                                              {tag.label}
                                                          </button>
                                                      );
                                                  })}
                                              </div>
                                          )}

                                          {menuType === "bar" && (
                                              <div className="flex-1 flex flex-wrap items-center gap-4">
                                                  <label className="flex items-center gap-2 cursor-pointer select-none">
                                                      <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${item.showBottlePeg ? "bg-amber-500" : "bg-slate-300"}`}>
                                                          <div className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full transition-transform duration-300 shadow-sm ${item.showBottlePeg ? "translate-x-4" : ""}`} />
                                                      </div>
                                                      <input
                                                          type="checkbox"
                                                          className="sr-only"
                                                          checked={item.showBottlePeg || false}
                                                          onChange={(e) => {
                                                              const newSections = [...menu.sections];
                                                              const targetItem = newSections.find((s) => s.id === sectionId)!.items[ii];
                                                              targetItem.showBottlePeg = e.target.checked;
                                                              if (!e.target.checked) {
                                                                  targetItem.bottlePrice = "";
                                                                  targetItem.pegPrice = "";
                                                              }
                                                              setMenu({ ...menu, sections: newSections });
                                                          }}
                                                      />
                                                      <span className="text-xs font-semibold text-slate-600">Bottle/Peg Mode</span>
                                                  </label>

                                                  {item.showBottlePeg && (
                                                      <div className="flex gap-2 animate-in fade-in slide-in-from-left-2">
                                                          <div className="relative">
                                                            <input
                                                                className="w-24 bg-white border border-slate-200 rounded-lg pl-6 py-1 text-xs focus:border-amber-500 outline-none"
                                                                value={item.bottlePrice || ""}
                                                                placeholder="Bottle"
                                                                onChange={(e) => {
                                                                    const newSections = [...menu.sections];
                                                                    newSections.find((s) => s.id === sectionId)!.items[ii].bottlePrice = e.target.value;
                                                                    setMenu({ ...menu, sections: newSections });
                                                                }}
                                                            />
                                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">₹</span>
                                                          </div>
                                                          <div className="relative">
                                                            <input
                                                                className="w-24 bg-white border border-slate-200 rounded-lg pl-6 py-1 text-xs focus:border-amber-500 outline-none"
                                                                value={item.pegPrice || ""}
                                                                placeholder="Peg"
                                                                onChange={(e) => {
                                                                    const newSections = [...menu.sections];
                                                                    newSections.find((s) => s.id === sectionId)!.items[ii].pegPrice = e.target.value;
                                                                    setMenu({ ...menu, sections: newSections });
                                                                }}
                                                            />
                                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">₹</span>
                                                          </div>
                                                      </div>
                                                  )}
                                              </div>
                                          )}
                                      </div>
                                    </div>
                                  ))}

                                  {/* Add Button */}
                                  <button
                                    onClick={() => {
                                      const newSections = [...menu.sections];
                                      const newItem = {
                                        name: "", price: "", desc: "", tags: [], imageUrl: "",
                                        showBottlePeg: false, bottlePrice: "", pegPrice: "",
                                      };
                                      newSections.find((s) => s.id === sectionId)!.items.push(newItem);
                                      setMenu({ ...menu, sections: newSections });
                                    }}
                                    className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-400 hover:bg-amber-50 transition-all text-sm font-bold flex items-center justify-center gap-2 group"
                                  >
                                    <PlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                                    Add Item to {section.title}
                                  </button>
                                </div>
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
        ) : (
          <div className="space-y-4">
             {[1,2,3].map((i) => (
                <div key={i} className="h-16 bg-white border border-slate-100 rounded-2xl animate-pulse shadow-sm"></div>
             ))}
          </div>
        )}
      </div>

      {/* Floating Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
         <div className="max-w-5xl mx-auto flex items-center justify-end pointer-events-auto">
            <div className={`
                flex items-center gap-4 px-6 py-3 rounded-full shadow-xl transition-all duration-500 border border-white/20 backdrop-blur-md
                ${saving ? "bg-slate-800 text-white" : "bg-white/90 border-slate-200 text-slate-800"}
            `}>
                 {saved && <span className="text-green-600 font-bold text-sm animate-pulse">✓ Saved!</span>}
                 
                 <button
                   onClick={handleSave}
                   disabled={saving}
                   className={`
                     px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-300 text-sm transform active:scale-95
                     ${saving 
                        ? "bg-slate-600 text-slate-400 cursor-not-allowed" 
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-amber-500/30 hover:-translate-y-0.5"
                     }
                   `}
                 >
                   {saving ? "Syncing..." : "Save Changes"}
                 </button>
            </div>
         </div>
      </div>
    </div>
  );
}