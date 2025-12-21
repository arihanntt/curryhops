"use client";

import { useEffect, useRef, useState } from "react";

type Booking = {
  _id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  people: number;
};

type Slot = {
  _id: string;
  date: string;
  hour: string;
  tablesAvailable: number;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  const previousCount = useRef<number>(0);

  const [slotDate, setSlotDate] = useState("");
  const [slotHour, setSlotHour] = useState("18:00");
  const [tables, setTables] = useState(10);

  /* ================= LOAD DATA ================= */

  const loadBookings = async () => {
    const res = await fetch("/api/admin/bookings", { cache: "no-store" });
    const data: Booking[] = await res.json();

    if (previousCount.current !== 0 && data.length > previousCount.current) {
      setHasNew(true);
    }

    previousCount.current = data.length;
    setBookings(data);
  };

  const loadSlots = async () => {
    const res = await fetch("/api/admin/slots", { cache: "no-store" });
    const data = await res.json();
    setSlots(data);
  };

  const refreshAll = async () => {
    setLoading(true);
    await loadBookings();
    await loadSlots();
    setLoading(false);
  };

  /* ================= AUTO REFRESH ================= */

  useEffect(() => {
    refreshAll();
    const interval = setInterval(refreshAll, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  /* ================= SAVE SLOT ================= */

  const saveSlot = async () => {
    if (!slotDate) return alert("Select date");

    await fetch("/api/admin/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: slotDate,
        hour: slotHour,
        tablesAvailable: tables,
      }),
    });

    alert("Slot updated");
    loadSlots();
  };

  /* ================= DELETE BOOKING ================= */

  const deleteBooking = async (id: string) => {
    if (!confirm("Delete this booking?")) return;

    await fetch(`/api/admin/bookings/${id}`, {
      method: "DELETE",
    });

    loadBookings();
  };

  /* ================= EXPORT CSV ================= */

  const exportCSV = () => {
    const rows = [
      ["Name", "Phone", "Date", "Time", "Guests"],
      ...bookings.map(b => [
        b.name,
        b.phone,
        b.date,
        b.time,
        String(b.people),
      ]),
    ];

    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const today = new Date().toISOString().split("T")[0];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 space-y-8">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Admin · Bookings</h1>

        <div className="flex gap-2 items-center">
          {hasNew && (
            <span className="text-sm bg-green-600 px-3 py-1 rounded-full">
              🔔 New bookings
            </span>
          )}

          <button
            onClick={() => {
              setHasNew(false);
              refreshAll();
            }}
            className="border px-4 py-2 rounded-full text-sm"
          >
            {loading ? "Refreshing…" : "🔄 Refresh"}
          </button>

          <button
            onClick={exportCSV}
            className="bg-amber-500 text-black px-4 py-2 rounded-full text-sm font-bold"
          >
            📤 Export CSV
          </button>
        </div>
      </div>

      {/* SLOT CONTROL */}
      <section className="border border-white/10 rounded-xl p-4 space-y-3">
        <h2 className="font-semibold">Slot Capacity Control</h2>

        <div className="grid md:grid-cols-4 gap-3">
          <input
            type="date"
            min={today}
            value={slotDate}
            onChange={e => setSlotDate(e.target.value)}
            className="bg-black border px-3 py-2 rounded"
          />

          <select
            value={slotHour}
            onChange={e => setSlotHour(e.target.value)}
            className="bg-black border px-3 py-2 rounded"
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const h = (i + 12).toString().padStart(2, "0");
              return (
                <option key={h} value={`${h}:00`}>
                  {h}:00 – {Number(h) + 1}:00
                </option>
              );
            })}
          </select>

          <input
            type="number"
            min={0}
            value={tables}
            onChange={e => setTables(Number(e.target.value))}
            className="bg-black border px-3 py-2 rounded"
          />

          <button
            onClick={saveSlot}
            className="bg-amber-500 text-black font-bold rounded py-2"
          >
            Save Slot
          </button>
        </div>
      </section>

      {/* SLOT LIST */}
      <section className="border border-white/10 rounded-xl p-4">
        <h2 className="font-semibold mb-3">Current Slot Overrides</h2>

        {slots.length === 0 ? (
          <p className="text-gray-400 text-sm">No slot overrides</p>
        ) : (
          slots.map(s => (
            <div
              key={s._id}
              className="flex justify-between border-b border-white/10 py-1 text-sm"
            >
              <span>{s.date} · {s.hour}</span>
              <span>{s.tablesAvailable} tables</span>
            </div>
          ))
        )}
      </section>

      {/* BOOKINGS */}
      <section className="space-y-4">
        <h2 className="font-semibold">All Bookings</h2>

        {bookings.length === 0 && (
          <p className="text-gray-400">No bookings found</p>
        )}

        {bookings.map(b => (
          <div
            key={b._id}
            className="border border-white/10 rounded-xl p-4 flex justify-between gap-4"
          >
            <div>
              <p className="font-bold">{b.name}</p>
              <p className="text-sm text-gray-400">{b.phone}</p>
              <p className="text-sm">
                {b.date} · {b.time} · {b.people} guests
              </p>
            </div>

            <button
              onClick={() => deleteBooking(b._id)}
              className="text-red-500 text-sm hover:underline"
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </section>

    </div>
  );
}
