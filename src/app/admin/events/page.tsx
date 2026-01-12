"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, Bars3Icon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchData();
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
    // Re-order remaining items
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

    // REMOVED CONFIRMATION DIALOG HERE

    try {
      setSaving(true);
      setStatus("idle");
      setErrorMessage("");

      // 1. Capture which item is currently expanded (by index) so we can re-open it
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

      // 2. Use the data returned from the server directly (Single Source of Truth)
      const freshData = await res.json();
      
      const mapped = freshData.map((d: any) => ({
        ...d,
        uniqueKey: d._id // Backend IDs are now stable
      }));

      setEvents(mapped);

      // 3. Restore the expanded state using the new ID at the same index
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

  if (!isClient) return <div className="p-10 bg-black text-white">Loading Editor...</div>;

  const validationMsg = getValidationMessage();
  const canSave = !saving && isFormValid();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Events Manager</h1>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              disabled={saving}
              className="p-2 text-gray-400 hover:text-white border border-gray-700 rounded-lg disabled:opacity-50"
              title="Refresh / Reload from DB"
            >
              <ArrowPathIcon className="h-6 w-6" />
            </button>
            <button
              onClick={save}
              disabled={!canSave}
              className={`px-6 py-2 rounded-lg font-bold transition ${
                canSave
                  ? "bg-amber-500 hover:bg-amber-400 text-black"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {status === "success" && (
          <div className="p-4 mb-6 bg-green-900/30 text-green-300 border border-green-700 rounded">
            ✓ Events saved successfully
          </div>
        )}

        {(status === "error" || errorMessage) && (
          <div className="p-4 mb-6 bg-red-900/30 text-red-300 border border-red-700 rounded">
            ✕ {errorMessage || "Failed to save. Check browser console (F12)"}
          </div>
        )}

        {validationMsg && (
          <div className="p-3 mb-4 bg-yellow-900/30 text-yellow-300 border border-yellow-700 rounded text-sm">
            Cannot save: {validationMsg}
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="events">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {events.map((ev, i) => {
                  const isExpanded = expanded === ev.uniqueKey;
                  const hasSlug = !!ev.slug?.trim();

                  return (
                    <Draggable key={ev.uniqueKey} draggableId={ev.uniqueKey} index={i}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`border rounded-xl bg-neutral-900 overflow-hidden ${
                            !hasSlug ? "border-amber-600/60" : "border-neutral-800"
                          }`}
                        >
                          {/* HEADER */}
                          <div className="flex items-center justify-between p-4 bg-neutral-800/60">
                            <div className="flex items-center gap-4 flex-1">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab hover:text-white text-gray-500"
                              >
                                <Bars3Icon className="h-6 w-6" />
                              </div>
                              <div
                                className="flex-1 cursor-pointer font-medium truncate"
                                onClick={() => setExpanded(isExpanded ? null : ev.uniqueKey)}
                              >
                                {ev.title?.trim() ? ev.title : <span className="text-gray-500 italic">Untitled</span>}
                                <span
                                  className={`ml-3 text-xs font-mono ${
                                    hasSlug ? "text-gray-500" : "text-amber-400"
                                  }`}
                                >
                                  {hasSlug ? `/${ev.slug}` : "missing slug"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(i)}
                                className="p-2 hover:bg-red-900/30 text-gray-400 hover:text-red-400 rounded"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                              <button onClick={() => setExpanded(isExpanded ? null : ev.uniqueKey)}>
                                {isExpanded ? (
                                  <ChevronUpIcon className="h-5 w-5" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="p-6 border-t border-neutral-800 space-y-6 bg-black/30">
                              {/* Title + Slug row */}
                              <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                    Event Title *
                                  </label>
                                  <input
                                    value={ev.title || ""}
                                    onChange={(e) => updateField(i, "title", e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded focus:border-amber-500 outline-none"
                                    placeholder="e.g. Acoustic Evening"
                                  />
                                </div>

                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                    Slug (Auto-Generate Only) *
                                  </label>
                                  <div className="flex gap-2">
                                    <input
                                      value={ev.slug || ""}
                                      readOnly
                                      className={`flex-1 bg-neutral-900 border p-3 rounded font-mono text-sm outline-none text-gray-500 cursor-not-allowed ${
                                        hasSlug ? "border-neutral-800" : "border-amber-900/50"
                                      }`}
                                      placeholder="Click Auto ->"
                                    />
                                    <button
                                      onClick={() => handleGenerateSlug(i)}
                                      className="px-4 bg-amber-600/20 border border-amber-600/50 text-amber-500 rounded hover:bg-amber-600 hover:text-white transition-colors text-xs uppercase tracking-wider font-bold"
                                      title="Generate from title"
                                    >
                                      Auto
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Date, Time, Location */}
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                    Date *
                                  </label>
                                  <input
                                    type="date"
                                    value={ev.date || ""}
                                    onChange={(e) => updateField(i, "date", e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded focus:border-amber-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                    Time
                                  </label>
                                  <input
                                    type="time"
                                    value={ev.time || ""}
                                    onChange={(e) => updateField(i, "time", e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded focus:border-amber-500 outline-none"
                                  />
                                </div>
                                <div className="space-y-2 col-span-2 md:col-span-1">
                                  <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                    Location
                                  </label>
                                  <input
                                    value={ev.location || ""}
                                    onChange={(e) => updateField(i, "location", e.target.value)}
                                    className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded focus:border-amber-500 outline-none"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                  Summary
                                </label>
                                <textarea
                                  value={ev.summary || ""}
                                  onChange={(e) => updateField(i, "summary", e.target.value)}
                                  className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded h-24 focus:border-amber-500 outline-none resize-y"
                                  placeholder="Brief description (shows on list page)"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                  Full Details
                                </label>
                                <textarea
                                  value={ev.details || ""}
                                  onChange={(e) => updateField(i, "details", e.target.value)}
                                  className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded h-48 focus:border-amber-500 outline-none resize-y"
                                  placeholder="Complete event information (shows on detail page)"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                                  Image URL
                                </label>
                                <input
                                  value={ev.image || ""}
                                  onChange={(e) => updateField(i, "image", e.target.value)}
                                  className="w-full bg-neutral-950 border border-neutral-700 p-3 rounded focus:border-amber-500 outline-none"
                                  placeholder="https://... or /images/my-event.jpg"
                                />
                                {ev.image?.trim() && (
                                  <div className="mt-3 h-48 w-full relative rounded-lg overflow-hidden border border-neutral-800">
                                    <img
                                      src={ev.image}
                                      alt="Preview"
                                      className="object-cover w-full h-full opacity-80"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                      }}
                                    />
                                  </div>
                                )}
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
          className="w-full py-5 mt-8 border-2 border-dashed border-neutral-700 rounded-xl text-gray-400 hover:border-amber-600 hover:text-amber-400 transition-all uppercase tracking-wider text-sm font-semibold"
        >
          + Add New Event
        </button>
      </div>
    </div>
  );
}