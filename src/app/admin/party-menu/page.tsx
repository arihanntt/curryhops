"use client";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CldUploadWidget } from "next-cloudinary"; 
import { 
  Bars3Icon, 
  TrashIcon, 
  PlusIcon,
  DocumentTextIcon, // Icon for PDF
  ArrowPathIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

export default function PartyMenuEditor() {
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  // STRICT MODE FIX for DnD
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  // 1. Fetch Party Menu Data
  useEffect(() => {
    fetch("/api/party-menu", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        // Ensure data is an array
        const safeData = Array.isArray(data) ? data : [];
        setCategories(safeData.map((c: any, i: number) => ({ ...c, id: c.id || `cat-${Date.now()}-${i}` })));
      })
      .catch((err) => console.error("Failed to load party menu:", err));
  }, []);

  // 2. Save Function
  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/party-menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categories), // Send the array directly
      });

      if (!res.ok) throw new Error("Failed to save");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Error saving menu");
    } finally {
      setSaving(false);
    }
  };

  // --- HELPER FUNCTIONS ---

  const addCategory = () => {
    const title = prompt("Enter Category Name (e.g., 'Buffet Packages'):");
    if (!title) return;
    setCategories([...categories, {
      id: `cat-${Date.now()}`,
      title,
      packages: []
    }]);
  };

  const deleteCategory = (id: string) => {
    if (!confirm("Delete this category?")) return;
    setCategories(categories.filter(c => c.id !== id));
  };

  const updatePackage = (catIndex: number, pkgIndex: number, field: string, value: any) => {
    const newCats = [...categories];
    newCats[catIndex].packages[pkgIndex][field] = value;
    setCategories(newCats);
  };

  const addPackage = (catIndex: number) => {
    const newCats = [...categories];
    newCats[catIndex].packages.push({
      id: `pkg-${Date.now()}`,
      name: "",
      price: "",
      tagline: "",
      type: "veg", // default
      pdfUrl: ""
    });
    setCategories(newCats);
  };

  const removePackage = (catIndex: number, pkgIndex: number) => {
    const newCats = [...categories];
    newCats[catIndex].packages.splice(pkgIndex, 1);
    setCategories(newCats);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCategories(items);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 pb-32 relative font-sans">
       {/* Background Glow */}
      <div className="fixed top-20 right-0 w-[500px] h-[500px] bg-[#C5A253]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-10 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-stone-800 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#C5A253]">Party Menu Editor</h1>
            <p className="text-stone-400 mt-1">Manage buffet packages, prices, and PDF menus.</p>
          </div>
          <button onClick={addCategory} className="flex items-center gap-2 px-6 py-2 bg-[#C5A253] text-stone-900 font-bold rounded-lg hover:bg-[#b08d43] transition-colors">
            <PlusIcon className="w-5 h-5"/> New Category
          </button>
        </div>

        {enabled ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="party-categories">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-8">
                  {categories.map((cat, catIndex) => (
                    <Draggable key={cat.id} draggableId={cat.id} index={catIndex}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-stone-800/50 backdrop-blur-sm ${snapshot.isDragging ? "border-[#C5A253] shadow-2xl z-50" : "border-stone-700"}`}
                        >
                          {/* CATEGORY HEADER */}
                          <div className="flex items-center justify-between p-4 bg-stone-800 border-b border-stone-700">
                            <div className="flex items-center gap-4">
                              <div {...provided.dragHandleProps} className="p-2 text-stone-500 hover:text-[#C5A253] cursor-grab">
                                <Bars3Icon className="h-6 w-6" />
                              </div>
                              <h2 className="text-xl font-bold text-stone-200">{cat.title}</h2>
                            </div>
                            <button onClick={() => deleteCategory(cat.id)} className="text-stone-500 hover:text-red-500 p-2">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>

                          {/* PACKAGES GRID */}
                          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {cat.packages.map((pkg: any, pkgIndex: number) => (
                              <div key={pkgIndex} className="bg-stone-900/80 border border-stone-700 rounded-xl p-5 relative group hover:border-stone-500 transition-colors">
                                
                                {/* Top Row: Name & Price */}
                                <div className="flex gap-3 mb-3">
                                  <div className="flex-1">
                                    <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Package Name</label>
                                    <input 
                                      className="w-full bg-stone-800 border border-stone-600 rounded-md px-3 py-2 text-stone-100 focus:border-[#C5A253] outline-none placeholder-stone-600"
                                      placeholder="e.g. Orbit Veg"
                                      value={pkg.name}
                                      onChange={(e) => updatePackage(catIndex, pkgIndex, "name", e.target.value)}
                                    />
                                  </div>
                                  <div className="w-24">
                                     <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Price (₹)</label>
                                     <input 
                                      className="w-full bg-stone-800 border border-stone-600 rounded-md px-3 py-2 text-[#C5A253] font-bold focus:border-[#C5A253] outline-none"
                                      placeholder="1199"
                                      value={pkg.price}
                                      onChange={(e) => updatePackage(catIndex, pkgIndex, "price", e.target.value)}
                                    />
                                  </div>
                                </div>

                                {/* Tagline */}
                                <div className="mb-4">
                                   <label className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Tagline</label>
                                   <input 
                                      className="w-full bg-stone-800 border border-stone-600 rounded-md px-3 py-2 text-stone-300 text-sm italic focus:border-[#C5A253] outline-none"
                                      placeholder="Friendly, social, connected..."
                                      value={pkg.tagline}
                                      onChange={(e) => updatePackage(catIndex, pkgIndex, "tagline", e.target.value)}
                                    />
                                </div>

                                {/* Controls: Type & PDF */}
                                <div className="flex items-center justify-between border-t border-stone-700 pt-3">
                                   {/* Type Toggle */}
                                   <button 
                                     onClick={() => updatePackage(catIndex, pkgIndex, "type", pkg.type === "veg" ? "non-veg" : "veg")}
                                     className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${pkg.type === 'veg' ? "bg-green-900/30 text-green-400 border-green-800" : "bg-red-900/30 text-red-400 border-red-800"}`}
                                   >
                                      <div className={`w-2 h-2 rounded-full ${pkg.type === 'veg' ? "bg-green-500" : "bg-red-500"}`} />
                                      {pkg.type === 'veg' ? "VEG" : "NON-VEG"}
                                   </button>

                                   {/* PDF Upload */}
                                   <CldUploadWidget 
                                      uploadPreset="curryandhops_menu" 
                                      // IMPORTANT: 'auto' allows PDF/Raw files
                                      options={{ sources: ['local'], resourceType: 'auto', maxFiles: 1, clientAllowedFormats: ["pdf"] }} 
                                      onSuccess={(res: any) => {
                                        updatePackage(catIndex, pkgIndex, "pdfUrl", res.info.secure_url);
                                        document.body.style.overflow = "auto";
                                      }}
                                    >
                                      {({ open }) => (
                                        <div className="flex items-center gap-2">
                                          {pkg.pdfUrl ? (
                                            <div className="flex items-center gap-2">
                                               <a href={pkg.pdfUrl} target="_blank" className="text-xs text-[#C5A253] hover:underline flex items-center gap-1">
                                                 <DocumentTextIcon className="w-4 h-4" /> View PDF
                                               </a>
                                               <button onClick={() => updatePackage(catIndex, pkgIndex, "pdfUrl", "")} className="text-stone-600 hover:text-red-500">
                                                 <TrashIcon className="w-4 h-4" />
                                               </button>
                                            </div>
                                          ) : (
                                            <button onClick={() => open()} className="flex items-center gap-1 text-xs text-stone-400 hover:text-white transition-colors">
                                              <ArrowPathIcon className="w-3 h-3" /> Upload Menu PDF
                                            </button>
                                          )}
                                        </div>
                                      )}
                                   </CldUploadWidget>
                                </div>

                                {/* Delete Package Button */}
                                <button onClick={() => removePackage(catIndex, pkgIndex)} className="absolute -top-2 -right-2 bg-stone-800 text-stone-500 hover:text-red-500 p-1.5 rounded-full border border-stone-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all">
                                  <TrashIcon className="w-4 h-4" />
                                </button>

                              </div>
                            ))}
                            
                            {/* Add Package Button */}
                            <button onClick={() => addPackage(catIndex)} className="flex flex-col items-center justify-center gap-2 min-h-[180px] border-2 border-dashed border-stone-700 rounded-xl text-stone-500 hover:text-[#C5A253] hover:border-[#C5A253]/50 hover:bg-[#C5A253]/5 transition-all">
                               <PlusIcon className="w-8 h-8" />
                               <span className="text-sm font-bold uppercase tracking-widest">Add Package</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="text-stone-500">Loading editor...</div>
        )}

        {/* Floating Save Button */}
        <div className="fixed bottom-6 right-6 z-50">
           <button 
             onClick={handleSave} 
             disabled={saving}
             className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105 ${saving ? "bg-stone-700 cursor-wait" : "bg-[#C5A253] text-black hover:bg-white"}`}
           >
             {saved ? <CheckBadgeIcon className="w-5 h-5"/> : <ArrowPathIcon className={`w-5 h-5 ${saving ? "animate-spin" : ""}`} />}
             {saved ? "Saved Successfully" : saving ? "Saving..." : "Save Changes"}
           </button>
        </div>

      </div>
    </div>
  );
}