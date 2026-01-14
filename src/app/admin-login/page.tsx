"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    if (!password) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("Invalid Credentials");

      router.push("/admin");
      router.refresh(); 
    } catch (err) {
      setError("ACCESS DENIED // INVALID KEY");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") login();
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden font-mono selection:bg-yellow-500 selection:text-black">
      
      {/* --- ANIMATED CAUTION TAPE BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        {/* Top Strip */}
        <div className="absolute top-[10%] left-[-10%] w-[120%] h-16 bg-yellow-500 -rotate-6 flex items-center overflow-hidden border-y-4 border-black shadow-lg shadow-yellow-500/50">
           <div className="animate-marquee whitespace-nowrap text-black font-black text-2xl tracking-widest">
              ERROR 403 // FORBIDDEN // RESTRICTED AREA // AUTHORIZED PERSONNEL ONLY // ERROR 403 // FORBIDDEN // RESTRICTED AREA // 
           </div>
        </div>
        {/* Bottom Strip */}
        <div className="absolute bottom-[15%] left-[-10%] w-[120%] h-16 bg-yellow-500 rotate-3 flex items-center overflow-hidden border-y-4 border-black shadow-lg shadow-yellow-500/50">
           <div className="animate-marquee-reverse whitespace-nowrap text-black font-black text-2xl tracking-widest">
              SECURITY ALERT // SYSTEM LOCKED // ADMIN ONLY // UNAUTHORIZED ACCESS LOGGED // SECURITY ALERT //
           </div>
        </div>
      </div>

      {/* --- LOGIN CARD --- */}
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="relative bg-neutral-900 border-2 border-neutral-800 p-8 shadow-2xl overflow-hidden group hover:border-yellow-600 transition-colors duration-500">
          
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-yellow-500"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-yellow-500"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-yellow-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-yellow-500"></div>

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-14 w-14 bg-yellow-500/10 border border-yellow-500 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(234,179,8,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">
              Admin<span className="text-yellow-500">System</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <p className="text-[10px] text-red-500 tracking-[0.2em] uppercase font-bold">
                  Connection Not Secure
                </p>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <input
              type="password"
              placeholder="ENTER SECURITY KEY"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="
                w-full bg-black border border-neutral-700 
                text-yellow-500 placeholder:text-neutral-700 text-center text-sm tracking-widest font-bold
                px-4 py-4 focus:outline-none focus:border-yellow-500 
                transition-all duration-200 uppercase
              "
            />

            {error && (
              <div className="text-center text-red-500 text-[10px] font-bold tracking-widest bg-red-950/20 p-2 border border-red-900/50 animate-pulse uppercase">
                 ⚠ {error}
              </div>
            )}

            <button
              onClick={login}
              disabled={loading}
              className="
                w-full bg-yellow-500 text-black font-black uppercase tracking-widest text-xs py-4
                hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)]
                active:scale-[0.98] transition-all duration-150
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "DECRYPTING..." : "AUTHENTICATE"}
            </button>
          </div>
        </div>
        
        {/* Footer Code */}
        <div className="text-center mt-8 opacity-40">
            <p className="text-[10px] text-neutral-500 font-mono uppercase">
                ID: {Math.random().toString(36).substr(2, 9).toUpperCase()} // PORT: 443
            </p>
        </div>
      </div>
    </div>
  );
}