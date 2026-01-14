"use client";

import { useEffect, useRef, useState } from "react";
import { 
  UserIcon, 
  PhoneIcon, 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  TrashIcon, 
  ArrowPathIcon, 
  ArrowDownTrayIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

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

  // Slot Management State
  const [slotDate, setSlotDate] = useState("");
  const [slotHour, setSlotHour] = useState("18:00");
  const [tables, setTables] = useState(10);

  /* ================= LOAD DATA ================= */

  const loadBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings", { cache: "no-store" });
      const data: Booking[] = await res.json();

      if (previousCount.current !== 0 && data.length > previousCount.current) {
        setHasNew(true);
      }

      previousCount.current = data.length;
      // Sort by date (newest first or closest upcoming)
      const sorted = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setBookings(sorted);
    } catch (e) {
      console.error("Failed to load bookings");
    }
  };

  const loadSlots = async () => {
    try {
      const res = await fetch("/api/admin/slots", { cache: "no-store" });
      const data = await res.json();
      setSlots(data);
    } catch (e) {
      console.error("Failed to load slots");
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    await Promise.all([loadBookings(), loadSlots()]);
    setLoading(false);
    setHasNew(false);
  };

  /* ================= AUTO REFRESH ================= */

  useEffect(() => {
    refreshAll();
    const interval = setInterval(refreshAll, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  /* ================= ACTIONS ================= */

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
    loadSlots();
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;
    await fetch(`/api/admin/bookings/${id}`, { method: "DELETE" });
    loadBookings();
  };

  const exportCSV = () => {
    const rows = [
      ["Name", "Phone", "Date", "Time", "Guests"],
      ...bookings.map(b => [b.name, b.phone, b.date, b.time, String(b.people)]),
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const today = new Date().toISOString().split("T")[0];

  /* ================= UI HELPERS ================= */

  const formatDateBox = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      month: d.toLocaleString('default', { month: 'short' }).toUpperCase()
    };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-6 md:p-12 relative overflow-x-hidden selection:bg-amber-100">
      
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-[300px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Reservations</h1>
            <p className="text-slate-500 mt-1">Manage table bookings and seating capacity.</p>
          </div>

          <div className="flex items-center gap-3">
             {hasNew && (
                <div className="animate-bounce bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-amber-500/30 flex items-center gap-2">
                   <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                   New Bookings!
                </div>
             )}
             
             <button 
                onClick={refreshAll}
                className="p-2.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 rounded-lg transition-all shadow-sm bg-white"
                title="Refresh Data"
             >
                <ArrowPathIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
             </button>

             <button 
                onClick={exportCSV}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-amber-300 hover:text-amber-600 text-slate-600 font-semibold rounded-lg shadow-sm transition-all"
             >
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Export CSV</span>
             </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bookings</span>
              <span className="text-2xl font-bold text-slate-900">{bookings.length}</span>
           </div>
           <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Guests</span>
              <span className="text-2xl font-bold text-slate-900">
                {bookings.reduce((acc, curr) => acc + (curr.people || 0), 0)}
              </span>
           </div>
           {/* Add more stats if needed */}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: BOOKINGS LIST */}
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                     <UsersIcon className="h-6 w-6 text-amber-500" />
                     Upcoming Reservations
                  </h2>
                  <span className="text-sm text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                     {bookings.length} active
                  </span>
               </div>

               {bookings.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                     <CalendarIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                     <p className="text-slate-500 font-medium">No bookings found.</p>
                  </div>
               ) : (
                 <div className="grid gap-4">
                    {bookings.map((b) => {
                       const { day, month } = formatDateBox(b.date);
                       return (
                          <div 
                             key={b._id} 
                             className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all duration-300 relative overflow-hidden"
                          >
                             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
                                
                                {/* Date Box */}
                                <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-amber-50 group-hover:border-amber-100 transition-colors">
                                   <span className="text-xs font-bold text-slate-400 uppercase group-hover:text-amber-500">{month}</span>
                                   <span className="text-2xl font-bold text-slate-800 group-hover:text-amber-600">{day}</span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                   <h3 className="text-lg font-bold text-slate-900 truncate">{b.name}</h3>
                                   <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                                      <div className="flex items-center gap-1.5">
                                         <ClockIcon className="h-4 w-4 text-amber-500" />
                                         {b.time}
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                         <UsersIcon className="h-4 w-4 text-amber-500" />
                                         {b.people} Guests
                                      </div>
                                      <div className="flex items-center gap-1.5 hover:text-amber-600 transition-colors">
                                         <PhoneIcon className="h-4 w-4" />
                                         <a href={`tel:${b.phone}`}>{b.phone}</a>
                                      </div>
                                   </div>
                                </div>

                                {/* Actions */}
                                <button
                                   onClick={() => deleteBooking(b._id)}
                                   className="absolute top-0 right-0 sm:relative sm:top-auto sm:right-auto p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                   title="Cancel Reservation"
                                >
                                   <TrashIcon className="h-5 w-5" />
                                </button>
                             </div>
                          </div>
                       );
                    })}
                 </div>
               )}
            </div>

            {/* RIGHT COLUMN: SLOT MANAGER (STICKY) */}
            <div className="lg:col-span-1">
               <div className="sticky top-24 space-y-6">
                  
                  {/* Control Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6">
                     <div className="flex items-center gap-2 mb-6 text-slate-800">
                        <AdjustmentsHorizontalIcon className="h-6 w-6 text-amber-500" />
                        <h3 className="font-bold text-lg">Capacity Manager</h3>
                     </div>
                     
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-slate-400 uppercase ml-1">Date to Override</label>
                           <input
                              type="date"
                              min={today}
                              value={slotDate}
                              onChange={(e) => setSlotDate(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Time Slot</label>
                              <select
                                 value={slotHour}
                                 onChange={(e) => setSlotHour(e.target.value)}
                                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none"
                              >
                                 {Array.from({ length: 12 }).map((_, i) => {
                                    const h = (i + 12).toString().padStart(2, "0");
                                    return <option key={h} value={`${h}:00`}>{h}:00</option>;
                                 })}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Tables</label>
                              <input
                                 type="number"
                                 min={0}
                                 value={tables}
                                 onChange={(e) => setTables(Number(e.target.value))}
                                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                              />
                           </div>
                        </div>

                        <button
                           onClick={saveSlot}
                           className="w-full mt-2 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-md active:scale-[0.98]"
                        >
                           Update Capacity
                        </button>
                     </div>
                  </div>

                  {/* Active Overrides List */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
                     <h4 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wide">Active Overrides</h4>
                     
                     {slots.length === 0 ? (
                        <p className="text-slate-400 text-sm italic">No custom capacity rules set.</p>
                     ) : (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                           {slots.map((s) => (
                              <div key={s._id} className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                                 <div>
                                    <div className="text-xs font-bold text-slate-400">{s.date}</div>
                                    <div className="text-sm font-semibold text-slate-700">{s.hour}</div>
                                 </div>
                                 <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                                    {s.tablesAvailable} tables
                                 </div>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

               </div>
            </div>
        </div>
      </div>
    </div>
  );
}