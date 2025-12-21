"use client";

import { useEffect, useState } from "react";

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

  const [slotDate, setSlotDate] = useState("");
  const [slotHour, setSlotHour] = useState("18:00");
  const [tables, setTables] = useState(10);

  /* ================= LOAD DATA ================= */

  const loadBookings = async () => {
    const res = await fetch("/api/admin/bookings", {
      cache: "no-store",
    });
    const data = await res.json();
    setBookings(data);
  };

  const loadSlots = async () => {
    const res = await fetch("/api/admin/slots", {
      cache: "no-store",
    });
    const data = await res.json();
    setSlots(data);
  };

  useEffect(() => {
    loadBookings();
    loadSlots();
  }, []);

  /* ================= SAVE SLOT ================= */

  const saveSlot = async () => {
    if (!slotDate) {
      alert("Please select a date");
      return;
    }

    await fetch("/api/admin/slots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: slotDate,
        hour: slotHour,
        tablesAvailable: tables,
      }),
      cache: "no-store",
    });

    alert("Slot updated");
    loadSlots();
  };

  const today = new Date().toISOString().split("T")[0];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 space-y-8">

      <h1 className="text-2xl font-bold">Admin · Bookings</h1>

      {/* ===== SLOT CONTROL ===== */}
      <section className="border border-white/10 rounded-xl p-4 space-y-3">
        <h2 className="font-semibold">Slot Capacity Control</h2>

        <div className="grid md:grid-cols-4 gap-3">
          <input
            type="date"
            min={today}
            value={slotDate}
            onChange={e => setSlotDate(e.target.value)}
            className="bg-black border border-white/20 px-3 py-2 rounded"
          />

          <select
            value={slotHour}
            onChange={e => setSlotHour(e.target.value)}
            className="bg-black border border-white/20 px-3 py-2 rounded"
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
            className="bg-black border border-white/20 px-3 py-2 rounded"
          />

          <button
            onClick={saveSlot}
            className="bg-amber-500 text-black font-bold rounded py-2"
          >
            Save Slot
          </button>
        </div>
      </section>

      {/* ===== SLOT LIST ===== */}
      <section className="border border-white/10 rounded-xl p-4">
        <h2 className="font-semibold mb-3">Current Slot Overrides</h2>

        {slots.length === 0 ? (
          <p className="text-gray-400 text-sm">No slot overrides</p>
        ) : (
          <div className="space-y-2 text-sm">
            {slots.map(s => (
              <div
                key={s._id}
                className="flex justify-between border-b border-white/10 pb-1"
              >
                <span>{s.date} · {s.hour}</span>
                <span>{s.tablesAvailable} tables</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== BOOKINGS LIST ===== */}
      <section className="space-y-4">
        <h2 className="font-semibold">All Bookings</h2>

        {bookings.length === 0 && (
          <p className="text-gray-400">No bookings found</p>
        )}

        {bookings.map(b => (
          <div
            key={b._id}
            className="border border-white/10 rounded-xl p-4"
          >
            <p className="font-bold">{b.name}</p>
            <p className="text-sm text-gray-400">{b.phone}</p>
            <p className="text-sm mt-1">
              {b.date} · {b.time} · {b.people} guests
            </p>
          </div>
        ))}
      </section>

    </div>
  );
}
