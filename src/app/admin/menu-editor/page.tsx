"use client";
import { useEffect, useState } from "react";
// Using the fix or the standard library
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { 
  Bars3Icon, 
  ChevronDownIcon, 
  TrashIcon, 
  PhotoIcon,
  PlusIcon,
  EyeIcon,        
  EyeSlashIcon,   
  SparklesIcon    
} from "@heroicons/react/24/outline";

// UPDATED TAGS: Added Gluten Free and Chef's Special
const FOOD_TAGS = [
  { id: "Non-Veg", label: "Non-Veg", color: "text-red-600 bg-red-50 border-red-200 ring-red-500/30" },
  { id: "Egg", label: "Egg", color: "text-yellow-600 bg-yellow-50 border-yellow-200 ring-yellow-500/30" },
  { id: "Spicy", label: "Spicy", color: "text-orange-600 bg-orange-50 border-orange-200 ring-orange-500/30" },
  { id: "Kids", label: "Kids", color: "text-blue-600 bg-blue-50 border-blue-200 ring-blue-500/30" },
  { id: "Vegan", label: "Vegan", color: "text-green-600 bg-green-50 border-green-200 ring-green-500/30" },
  { id: "Gluten Free", label: "Gluten Free", color: "text-emerald-700 bg-emerald-50 border-emerald-200 ring-emerald-500/30" },
  { id: "Chef's Special", label: "Chef's Special", color: "text-purple-700 bg-purple-50 border-purple-200 ring-purple-500/30" },
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

  // ✅ CRITICAL FIX: Fetch with 'no-store' to bypass Vercel/Browser Cache
  useEffect(() => {
    fetch("/api/menu", { 
      cache: "no-store", 
      next: { revalidate: 0 } 
    })
      .then((r) => r.json())
      .then((data) => {
        if(data.error) throw new Error(data.error);
        
        let updatedMenu = { ...data };
        // Ensure unique IDs if missing
        updatedMenu.sections = updatedMenu.sections.map((s: any, index: number) => ({
           ...s,
           id: s.id || `section-${Date.now()}-${index}` 
        }));
        setMenu(updatedMenu);
      })
      .catch((err) => {
        console.error("Failed to load menu:", err);
        alert("Could not load menu. Check console.");
      });
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

      const data = await res.json();

      if (!res.ok) {
        console.error("Save Failed (Server):", data);
        throw new Error(data.error || "Server rejected the save");
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      // Update local state with the confirmed data from server
      setMenu(data);
    } catch (err: any) {
      console.error("Save Error:", err);
      alert(`Failed to save: ${err.message}`);
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

  // --- VARIANT HELPERS ---
  const updateVariant = (sectionId: string, itemIndex: number, varIndex: number, field: 'name' | 'price', val: string) => {
    const newSections = [...menu.sections];
    const item = newSections.find((s) => s.id === sectionId)!.items[itemIndex];
    if (item.variants && item.variants[varIndex]) {
      item.variants[varIndex][field] = val;
    }
    setMenu({ ...menu, sections: newSections });
  };

  const addVariant = (sectionId: string, itemIndex: number) => {
    const newSections = [...menu.sections];
    const item = newSections.find((s) => s.id === sectionId)!.items[itemIndex];
    if (!item.variants) item.variants = [];
    item.variants.push({ name: "", price: "" });
    setMenu({ ...menu, sections: newSections });
  };

  const removeVariant = (sectionId: string, itemIndex: number, varIndex: number) => {
    const newSections = [...menu.sections];
    const item = newSections.find((s) => s.id === sectionId)!.items[itemIndex];
    if (item.variants) item.variants.splice(varIndex, 1);
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
                              rounded-2xl border transition-all duration-300 overflow-hidden
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
                              <div className="p-4 pt-0 space-y-4">
                                  {section.items.map((item: any, ii: number) => (
                                    <div
                                      key={ii}
                                      className={`
                                        p-4 rounded-xl border relative transition-all duration-300
                                        ${item.available === false 
                                            ? "bg-slate-50 border-slate-200 opacity-75 grayscale-[0.5]" 
                                            : "bg-white border-slate-200 hover:border-amber-200 shadow-sm"
                                        }
                                      `}
                                    >
                                      {/* --- TOP ROW: BASIC INPUTS --- */}
                                      <div className="grid md:grid-cols-12 gap-3 mb-3">
                                          {/* Name */}
                                          <div className="md:col-span-3">
                                            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm font-bold focus:border-amber-500 outline-none" 
                                              value={item.name || ""} placeholder="Item Name"
                                              onChange={(e) => {
                                                const newSections = [...menu.sections];
                                                newSections.find((s) => s.id === sectionId)!.items[ii].name = e.target.value;
                                                setMenu({ ...menu, sections: newSections });
                                              }}
                                            />
                                          </div>
                                          {/* Description */}
                                          <div className="md:col-span-5">
                                            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-600 text-sm focus:border-amber-500 outline-none" 
                                              value={item.desc || ""} placeholder="Description / Ingredients..."
                                              onChange={(e) => {
                                                const newSections = [...menu.sections];
                                                newSections.find((s) => s.id === sectionId)!.items[ii].desc = e.target.value;
                                                setMenu({ ...menu, sections: newSections });
                                              }}
                                            />
                                          </div>
                                          {/* Price */}
                                          <div className="md:col-span-2">
                                            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm font-mono focus:border-amber-500 outline-none" 
                                              value={item.price || ""} placeholder="Price"
                                              onChange={(e) => {
                                                const newSections = [...menu.sections];
                                                newSections.find((s) => s.id === sectionId)!.items[ii].price = e.target.value;
                                                setMenu({ ...menu, sections: newSections });
                                              }}
                                            />
                                          </div>
                                          {/* Image */}
                                          <div className="md:col-span-2 relative">
                                            <input className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 py-2 text-slate-600 text-xs focus:border-amber-500 outline-none truncate" 
                                              value={item.imageUrl || ""} placeholder="Image URL"
                                              onChange={(e) => {
                                                const newSections = [...menu.sections];
                                                newSections.find((s) => s.id === sectionId)!.items[ii].imageUrl = e.target.value;
                                                setMenu({ ...menu, sections: newSections });
                                              }}
                                            />
                                            <PhotoIcon className="w-4 h-4 text-slate-400 absolute left-2 top-2.5"/>
                                          </div>
                                      </div>

                                      {/* --- MIDDLE ROW: CONTROLS (AVAILABILITY, CUSTOMIZABLE, DELETE) --- */}
                                      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-t border-b border-slate-100 mt-2">
                                          
                                          <div className="flex items-center gap-3">
                                            {/* 1. AVAILABILITY TOGGLE */}
                                            <button 
                                              onClick={() => {
                                                const newSections = [...menu.sections];
                                                const current = newSections.find((s) => s.id === sectionId)!.items[ii].available;
                                                // If undefined, it defaults to true, so toggle to false. If false, toggle to true.
                                                newSections.find((s) => s.id === sectionId)!.items[ii].available = current === false ? true : false;
                                                setMenu({ ...menu, sections: newSections });
                                              }}
                                              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                                item.available !== false 
                                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                                                  : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                                              }`}
                                            >
                                              {item.available !== false ? <EyeIcon className="w-4 h-4"/> : <EyeSlashIcon className="w-4 h-4"/>}
                                              {item.available !== false ? "Serving Now" : "Sold Out (Hidden)"}
                                            </button>

                                            {/* 2. CUSTOMIZABLE TOGGLE */}
                                            {menuType === 'food' && (
                                              <button
                                                onClick={() => {
                                                  const newSections = [...menu.sections];
                                                  const current = newSections.find((s) => s.id === sectionId)!.items[ii].isCustomizable;
                                                  newSections.find((s) => s.id === sectionId)!.items[ii].isCustomizable = !current;
                                                  setMenu({ ...menu, sections: newSections });
                                                }}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                                                  item.isCustomizable 
                                                    ? "bg-purple-50 text-purple-700 border-purple-200" 
                                                    : "bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600"
                                                }`}
                                              >
                                                <SparklesIcon className="w-4 h-4"/>
                                                Customizable {item.isCustomizable ? "ON" : "OFF"}
                                              </button>
                                            )}
                                          </div>

                                          {/* 3. DELETE ITEM */}
                                          <button 
                                            onClick={() => {
                                               const newSections = [...menu.sections];
                                               newSections.find((s) => s.id === sectionId)!.items.splice(ii, 1);
                                               setMenu({ ...menu, sections: newSections });
                                            }}
                                            className="text-slate-300 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                            title="Delete Item"
                                          >
                                            <TrashIcon className="w-5 h-5"/>
                                          </button>
                                      </div>

                                      {/* --- BOTTOM ROW: TAGS & VARIANTS --- */}
                                      <div className="pt-3 space-y-4">
                                        
                                        {/* Tags Selector */}
                                        {menuType === 'food' && (
                                          <div className="flex flex-wrap gap-2 items-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Tags:</span>
                                            {FOOD_TAGS.map(tag => (
                                              <button key={tag.id} onClick={() => toggleTag(sectionId, ii, tag.id)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                                                  item.tags?.includes(tag.id) 
                                                    ? tag.color 
                                                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                                                }`}
                                              >
                                                {tag.label}
                                              </button>
                                            ))}
                                          </div>
                                        )}

                                        {/* Variants Editor (Visible if Customizable is ON) */}
                                        {item.isCustomizable && (
                                          <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 mt-3 animate-in fade-in slide-in-from-top-2">
                                            <h4 className="text-[10px] font-bold text-purple-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                              <SparklesIcon className="w-3 h-3"/>
                                              Add-ons / Variants
                                            </h4>
                                            
                                            <div className="space-y-2">
                                              {(item.variants || []).map((v: any, vi: number) => (
                                                <div key={vi} className="flex gap-2 items-center">
                                                  <span className="text-purple-300 text-xs font-mono">{vi + 1}.</span>
                                                  <input 
                                                    className="flex-1 bg-white border border-purple-200 rounded-lg px-3 py-1.5 text-xs focus:border-purple-500 outline-none" 
                                                    placeholder="Option Name (e.g. Add Chicken, Extra Cheese)"
                                                    value={v.name}
                                                    onChange={(e) => updateVariant(sectionId, ii, vi, 'name', e.target.value)}
                                                  />
                                                  <div className="relative w-24">
                                                    <input 
                                                      className="w-full bg-white border border-purple-200 rounded-lg pl-6 pr-2 py-1.5 text-xs focus:border-purple-500 outline-none" 
                                                      placeholder="Price"
                                                      value={v.price}
                                                      onChange={(e) => updateVariant(sectionId, ii, vi, 'price', e.target.value)}
                                                    />
                                                    <span className="absolute left-2.5 top-1.5 text-purple-400 text-xs">+</span>
                                                  </div>
                                                  <button 
                                                    onClick={() => removeVariant(sectionId, ii, vi)} 
                                                    className="text-purple-300 hover:text-red-500 p-1"
                                                  >
                                                    <TrashIcon className="w-4 h-4"/>
                                                  </button>
                                                </div>
                                              ))}
                                              
                                              <button 
                                                onClick={() => addVariant(sectionId, ii)} 
                                                className="text-xs font-bold text-purple-600 bg-purple-100 hover:bg-purple-200 px-4 py-2 rounded-lg flex items-center gap-1 mt-2 transition-colors"
                                              >
                                                <PlusIcon className="w-3 h-3"/> Add Option
                                              </button>
                                            </div>
                                          </div>
                                        )}
                                      </div>

                                      {/* Bar Specific: Bottle/Peg (Only if in Bar Mode) */}
                                      {menuType === "bar" && (
                                        <div className="pt-3 border-t border-slate-100 mt-3">
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
                                              <span className="text-xs font-semibold text-slate-600">Enable Bottle / Peg Pricing</span>
                                            </label>

                                            {item.showBottlePeg && (
                                                <div className="flex gap-4 mt-3 animate-in fade-in slide-in-from-left-2">
                                                    <div className="relative">
                                                        <input
                                                            className="w-32 bg-slate-50 border border-slate-200 rounded-lg pl-6 py-2 text-xs focus:border-amber-500 outline-none"
                                                            value={item.bottlePrice || ""}
                                                            placeholder="Bottle Price"
                                                            onChange={(e) => {
                                                                const newSections = [...menu.sections];
                                                                newSections.find((s) => s.id === sectionId)!.items[ii].bottlePrice = e.target.value;
                                                                setMenu({ ...menu, sections: newSections });
                                                            }}
                                                        />
                                                        <span className="absolute left-2.5 top-2 text-slate-400 text-xs">₹</span>
                                                        <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold uppercase">BTL</span>
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            className="w-32 bg-slate-50 border border-slate-200 rounded-lg pl-6 py-2 text-xs focus:border-amber-500 outline-none"
                                                            value={item.pegPrice || ""}
                                                            placeholder="Peg Price"
                                                            onChange={(e) => {
                                                                const newSections = [...menu.sections];
                                                                newSections.find((s) => s.id === sectionId)!.items[ii].pegPrice = e.target.value;
                                                                setMenu({ ...menu, sections: newSections });
                                                            }}
                                                        />
                                                        <span className="absolute left-2.5 top-2 text-slate-400 text-xs">₹</span>
                                                        <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 font-bold uppercase">Peg</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  ))}

                                  {/* Add New Item Button */}
                                  <button
                                    onClick={() => {
                                      const newSections = [...menu.sections];
                                      const newItem = {
                                        name: "", price: "", desc: "", tags: [], imageUrl: "",
                                        available: true, isCustomizable: false, variants: [],
                                        showBottlePeg: false, bottlePrice: "", pegPrice: "",
                                      };
                                      newSections.find((s) => s.id === sectionId)!.items.push(newItem);
                                      setMenu({ ...menu, sections: newSections });
                                    }}
                                    className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 hover:text-amber-600 hover:border-amber-400 hover:bg-amber-50 transition-all text-sm font-bold flex items-center justify-center gap-2 group"
                                  >
                                    <PlusIcon className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                                    Add New Item to {section.title}
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
        ) : (
          <div className="space-y-4">
             {[1,2,3].map((i) => (
                <div key={i} className="h-16 bg-white border border-slate-100 rounded-2xl animate-pulse shadow-sm"></div>
             ))}
          </div>
        )}

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
    </div>
  );
}