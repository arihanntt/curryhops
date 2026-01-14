"use client";

import { useEffect, useState } from "react";
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  Bars3Icon, 
  TrashIcon, 
  ArrowPathIcon,
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
  LinkIcon,
  PlusIcon
} from "@heroicons/react/24/outline";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const generateSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export default function EventsAdmin() {
  const [events, setEvents] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // Strict Mode / Hydration Fix for DnD
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    fetchData();
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const fetchData = async () => {
    try {
      const r = await fetch("/api/events", { cache: "no-store" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();

      const mapped = data.map((d: any) => ({
        ...d,
        uniqueKey: d._id || `local-${Math.random().toString(36).slice(2, 10)}`,
      }));
      setEvents(mapped);
      setStatus("idle");
      setErrorMessage("");
    } catch (err) {
      console.error("Fetch events failed:", err);
      setStatus("error");
      setErrorMessage("Could not load events. Check connection or server.");
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = [...events];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setEvents(items.map((e, i) => ({ ...e, order: i })));
  };

  const handleAdd = () => {
    const tempId = `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setEvents([
      ...events,
      {
        uniqueKey: tempId,
        title: "",
        slug: "",
        date: "",
        time: "",
        location: "",
        summary: "",
        details: "",
        image: "",
        order: events.length,
      },
    ]);
    setExpanded(tempId);
  };

  const handleDelete = (index: number) => {
    if (!confirm("Delete this event?")) return;
    const newEvents = [...events];
    newEvents.splice(index, 1);
    setEvents(newEvents.map((e, i) => ({ ...e, order: i })));
  };

  const updateField = (index: number, field: string, value: string) => {
    const copy = [...events];
    copy[index][field] = value;
    setEvents(copy);
  };

  const handleGenerateSlug = (index: number) => {
    const copy = [...events];
    if (copy[index].title?.trim()) {
      copy[index].slug = generateSlug(copy[index].title);
    } else {
      alert("Please enter a Title first.");
    }
    setEvents(copy);
  };

  const isFormValid = () => {
    if (events.length === 0) return true;
    const slugs = new Set<string>();
    for (const ev of events) {
      if (!ev.title?.trim() || !ev.slug?.trim() || !ev.date?.trim()) {
        return false;
      }
      if (slugs.has(ev.slug.trim())) {
        return false;
      }
      slugs.add(ev.slug.trim());
    }
    return true;
  };

  const getValidationMessage = () => {
    if (events.length === 0) return "";
    const issues: string[] = [];
    const slugs = new Set<string>();

    events.forEach((ev) => {
      if (!ev.title?.trim()) issues.push("Missing title");
      if (!ev.slug?.trim()) issues.push("Missing slug");
      if (!ev.date?.trim()) issues.push("Missing date");
      if (ev.slug?.trim() && slugs.has(ev.slug.trim())) {
        issues.push(`Duplicate slug: ${ev.slug}`);
      }
      if (ev.slug?.trim()) slugs.add(ev.slug.trim());
    });

    return issues.length > 0 ? issues.join(" • ") : "";
  };

  const save = async () => {
    const validationMsg = getValidationMessage();
    if (validationMsg) {
      setStatus("error");
      setErrorMessage(validationMsg);
      return;
    }

    try {
      setSaving(true);
      setStatus("idle");
      setErrorMessage("");

      const expandedIndex = events.findIndex(e => e.uniqueKey === expanded);
      const payload = events.map(({ _id, __v, ...rest }) => rest);

      const res = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: payload }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const freshData = await res.json();
      const mapped = freshData.map((d: any) => ({
        ...d,
        uniqueKey: d._id 
      }));

      setEvents(mapped);

      if (expandedIndex !== -1 && mapped[expandedIndex]) {
        setExpanded(mapped[expandedIndex].uniqueKey);
      }

      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err: any) {
      console.error("SAVE FAILED:", err);
      setStatus("error");
      setErrorMessage(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const validationMsg = getValidationMessage();
  const canSave = !saving && isFormValid();

  if (!enabled) return (
     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2">
            <div className="h-8 w-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
            <span className="text-slate-400 text-sm font-medium">Loading Events...</span>
        </div>
     </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 relative overflow-x-hidden selection:bg-amber-100">
      
      {/* Background Decor */}
      <div className="fixed top-20 right-0 w-[600px] h-[600px] bg-gradient-to-b from-amber-500/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Events Manager</h1>
            <p className="text-slate-500 mt-1">Manage upcoming parties, live music, and special nights.</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={fetchData}
              disabled={saving}
              className="p-2.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 rounded-lg transition-all disabled:opacity-50 shadow-sm"
              title="Refresh / Reload from DB"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>
            <button
              onClick={save}
              disabled={!canSave}
              className={`flex-1 sm:flex-none px-8 py-2.5 rounded-lg font-bold shadow-md transition-all transform active:scale-95 ${
                canSave
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/30"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="animate-in fade-in slide-in-from-top-4 p-4 mb-8 bg-green-50 text-green-700 border border-green-200 rounded-xl flex items-center gap-2 shadow-sm">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            ✓ Events synced successfully
          </div>
        )}

        {(status === "error" || errorMessage) && (
          <div className="animate-in fade-in slide-in-from-top-4 p-4 mb-8 bg-red-50 text-red-700 border border-red-200 rounded-xl shadow-sm">
             ✕ {errorMessage || "Failed to save. Check browser console."}
          </div>
        )}

        {validationMsg && (
          <div className="p-4 mb-8 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-sm shadow-sm flex items-center gap-2">
             <span className="font-bold">Attention:</span> {validationMsg}
          </div>
        )}

        {/* Drag & Drop List */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="events">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {events.map((ev, i) => {
                  const isExpanded = expanded === ev.uniqueKey;
                  const hasSlug = !!ev.slug?.trim();

                  return (
                    <Draggable key={ev.uniqueKey} draggableId={ev.uniqueKey} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`
                            bg-white rounded-2xl border transition-all duration-300 overflow-hidden
                            ${snapshot.isDragging 
                                ? "shadow-2xl shadow-amber-500/20 border-amber-400 scale-[1.02] z-50 ring-1 ring-amber-400" 
                                : "shadow-sm border-slate-200 hover:shadow-md hover:border-amber-200"
                            }
                            ${!hasSlug ? "border-l-4 border-l-red-400" : ""}
                          `}
                        >
                          {/* Card Header (Always Visible) */}
                          <div className="flex items-center justify-between p-4 bg-white">
                            <div className="flex items-center gap-4 flex-1">
                              {/* Drag Handle */}
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-amber-500 transition-colors"
                              >
                                <Bars3Icon className="h-6 w-6" />
                              </div>

                              {/* Clickable Title Area */}
                              <div
                                className="flex-1 cursor-pointer"
                                onClick={(e) => {
                                   // Prevent expanding if clicking delete
                                   e.stopPropagation();
                                   setExpanded(isExpanded ? null : ev.uniqueKey);
                                }}
                              >
                                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                    <span className={`font-bold text-lg ${ev.title ? "text-slate-800" : "text-slate-400 italic"}`}>
                                        {ev.title?.trim() || "Untitled Event"}
                                    </span>
                                    
                                    {/* Mini Badges for Date/Loc when collapsed */}
                                    {!isExpanded && (
                                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 md:mt-0">
                                            {ev.date && (
                                                <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full">
                                                    <CalendarIcon className="w-3 h-3" /> {ev.date}
                                                </span>
                                            )}
                                            {ev.location && (
                                                <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full hidden sm:flex">
                                                    <MapPinIcon className="w-3 h-3" /> {ev.location}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs font-mono text-slate-400 mt-0.5">
                                    {hasSlug ? `/${ev.slug}` : <span className="text-red-400 font-bold">Missing URL Slug</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(i)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Event"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                              <button 
                                onClick={() => setExpanded(isExpanded ? null : ev.uniqueKey)}
                                className={`p-2 rounded-full border border-slate-200 text-slate-400 hover:bg-slate-100 transition-all duration-300 ${isExpanded ? "rotate-180 bg-slate-100 text-slate-700" : ""}`}
                              >
                                <ChevronDownIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>

                          {/* Expanded Form */}
                          {isExpanded && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-6 animate-in slide-in-from-top-2">
                              
                              {/* Row 1: Title & Slug */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1">Event Title *</label>
                                  <input
                                    value={ev.title || ""}
                                    onChange={(e) => updateField(i, "title", e.target.value)}
                                    className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                    placeholder="e.g. Acoustic Evening"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1">URL Slug *</label>
                                  <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <LinkIcon className="w-4 h-4" />
                                        </div>
                                        <input
                                            value={ev.slug || ""}
                                            readOnly
                                            className="w-full pl-9 bg-slate-100 border border-slate-200 p-3 rounded-xl font-mono text-sm text-slate-500 cursor-not-allowed"
                                            placeholder="Auto-generated..."
                                        />
                                    </div>
                                    <button
                                      onClick={() => handleGenerateSlug(i)}
                                      className="px-4 bg-white border border-slate-200 text-amber-600 rounded-xl hover:bg-amber-50 hover:border-amber-300 transition-colors text-xs uppercase tracking-wider font-bold shadow-sm"
                                    >
                                      Generate
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Row 2: Date, Time, Location */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1 flex items-center gap-1">
                                    <CalendarIcon className="w-3 h-3" /> Date *
                                  </label>
                                  <input
                                    type="date"
                                    value={ev.date || ""}
                                    onChange={(e) => updateField(i, "date", e.target.value)}
                                    className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1">Time</label>
                                  <input
                                    type="time"
                                    value={ev.time || ""}
                                    onChange={(e) => updateField(i, "time", e.target.value)}
                                    className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1 flex items-center gap-1">
                                     <MapPinIcon className="w-3 h-3" /> Location
                                  </label>
                                  <input
                                    value={ev.location || ""}
                                    onChange={(e) => updateField(i, "location", e.target.value)}
                                    className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                    placeholder="e.g. Main Hall"
                                  />
                                </div>
                              </div>

                              {/* Row 3: Summaries */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1">Short Summary</label>
                                    <textarea
                                        value={ev.summary || ""}
                                        onChange={(e) => updateField(i, "summary", e.target.value)}
                                        className="w-full bg-white border border-slate-200 p-3 rounded-xl h-32 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                                        placeholder="Brief description for list view..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1">Full Details</label>
                                    <textarea
                                        value={ev.details || ""}
                                        onChange={(e) => updateField(i, "details", e.target.value)}
                                        className="w-full bg-white border border-slate-200 p-3 rounded-xl h-32 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                                        placeholder="Complete details for the event page..."
                                    />
                                </div>
                              </div>

                              {/* Row 4: Image */}
                              <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wide text-slate-500 font-bold ml-1 flex items-center gap-1">
                                    <PhotoIcon className="w-3 h-3" /> Cover Image
                                </label>
                                <div className="flex flex-col md:flex-row gap-4 items-start">
                                    <div className="flex-1 w-full">
                                        <input
                                            value={ev.image || ""}
                                            onChange={(e) => updateField(i, "image", e.target.value)}
                                            className="w-full bg-white border border-slate-200 p-3 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                                            placeholder="https://..."
                                        />
                                        <p className="text-xs text-slate-400 mt-1 ml-1">Paste a direct link to an image.</p>
                                    </div>
                                    {ev.image?.trim() && (
                                        <div className="w-full md:w-48 h-24 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0 relative group">
                                            <img
                                                src={ev.image}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error'}
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        </div>
                                    )}
                                </div>
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

        <button
          onClick={handleAdd}
          className="w-full py-4 mt-8 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50/50 transition-all uppercase tracking-wider text-sm font-bold flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5" /> Add New Event
        </button>
      </div>
    </div>
  );
}