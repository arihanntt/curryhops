"use client";

import { useEffect, useState } from "react";

type Props = { onClose: () => void };

export default function BookingModal({ onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    people: 2,
  });

  const [availability, setAvailability] = useState<{
    available: boolean;
    message: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();
  const minDate = today.toISOString().split("T")[0];
  const minTime =
    form.date === minDate
      ? today.toTimeString().slice(0, 5)
      : "00:00";

  /* ================= CHECK AVAILABILITY ================= */

  useEffect(() => {
    if (!form.date || !form.time) return;

    fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: form.date, time: form.time }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.available) {
          setAvailability({
            available: false,
            message: "❌ Slot fully booked",
          });
        } else {
          setAvailability({
            available: true,
            message: `✅ ${data.remainingTables} tables available`,
          });
        }
      });
  }, [form.date, form.time]);

  /* ================= SUBMIT BOOKING ================= */

  const submitBooking = async () => {
    setError("");

    if (!availability || !availability.available) {
      setError("This slot is fully booked. Please choose another time.");
      return;
    }

    if (!form.name || !form.phone || !form.date || !form.time) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/book-table", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      setError("Failed to book table. Please try again.");
      return;
    }

    // ✅ SUCCESS
    setSuccess(true);
  };

  /* ================= SUCCESS SCREEN ================= */

  if (success) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
        <div className="bg-[#faf7f2] rounded-2xl p-8 max-w-md w-[95%] text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-3">
            🎉 Booking Confirmed
          </h2>
          <p className="text-gray-700 mb-6">
            Your table has been booked successfully.
          </p>
          <button
            onClick={onClose}
            className="rounded-full bg-amber-500 px-6 py-3 font-bold text-white"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  /* ================= MAIN FORM ================= */

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur flex items-center justify-center">
      <div className="relative w-[95%] max-w-md rounded-2xl bg-[#faf7f2] p-6 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
          aria-label="Close booking modal"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-[#2c2c2c]">
          Reserve a Table
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                min={minDate}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                min={minTime}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
                onChange={e => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Guests
            </label>
            <input
              type="number"
              min={1}
              max={20}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900"
              onChange={e =>
                setForm({ ...form, people: Number(e.target.value) })
              }
            />
          </div>
        </div>

        {/* Availability */}
        {availability && (
          <p className="mt-4 text-center font-semibold text-sm text-gray-800">
            {availability.message}
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="mt-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={submitBooking}
          disabled={
            loading ||
            !availability ||
            !availability.available
          }
          className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 py-3 font-bold text-white disabled:opacity-50"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
