import Link from "next/link";

// Define the dashboard modules
const adminModules = [
  {
    title: "Homepage Banner",
    description: "Update the main promotional banner",
    href: "/admin/banner",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
    ),
  },
  {
    title: "Menu PDF",
    description: "Upload or replace the full menu file",
    href: "/admin/pdf",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
    ),
  },
  {
    title: "Menu Editor",
    description: "Add, edit, or remove individual dishes",
    href: "/admin/menu-editor",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
    ),
  },
  {
    title: "Party Menu Editor",
    description: "Manage buffet packages, prices & PDFs",
    href: "/admin/party-menu",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/>
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
        <path d="M2 21h20"/>
        <path d="M7 8v3"/>
        <path d="M12 8v3"/>
        <path d="M17 8v3"/>
        <path d="M7 4h.01"/>
        <path d="M12 4h.01"/>
        <path d="M17 4h.01"/>
      </svg>
    ),
  },
  {
    title: "Table Bookings",
    description: "View and manage customer reservations",
    href: "/admin/bookings",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
    ),
  },
  {
    title: "Events Manager",
    description: "Publish special events and parties",
    href: "/admin/events",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
    ),
  },
];
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-amber-100">
      
      {/* Navbar: Sticky, Glassmorphic, Modern */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo / Brand Area */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md shadow-amber-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">
              Admin<span className="text-amber-500">Panel</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
             <Link 
                href="/" 
                className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-amber-600 transition-colors bg-slate-100 hover:bg-amber-50 px-4 py-2 rounded-full"
             >
                <span>View Website</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
             </Link>
             
             {/* Profile / Avatar */}
             <div className="h-9 w-9 rounded-full bg-slate-200 border border-slate-300 overflow-hidden cursor-pointer hover:ring-2 hover:ring-amber-500 hover:ring-offset-2 transition-all">
                <svg className="w-full h-full text-slate-400 p-1" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back, Admin 👋
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Here's what's happening with your restaurant today.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
                group relative flex flex-col justify-between
                bg-white rounded-2xl border border-gray-200 p-6
                shadow-sm transition-all duration-300
                hover:shadow-xl hover:shadow-slate-200/50 hover:border-amber-200 hover:-translate-y-1
              "
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  {/* Icon Bubble */}
                  <div className="
                    h-12 w-12 rounded-xl 
                    bg-amber-50 text-amber-600 
                    flex items-center justify-center 
                    group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110
                    transition-all duration-300 shadow-sm
                  ">
                    {item.icon}
                  </div>
                  
                  {/* Arrow Action */}
                  <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Decorative bottom line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl" />
            </Link>
          ))}
        </div>
      </main>
      
      {/* Subtle Warm Light Leak */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-amber-100/40 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}