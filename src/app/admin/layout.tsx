import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // CHANGED: bg-black -> bg-slate-50, text-white -> text-slate-900
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100">
      <AdminNavbar />
      {/* Removed pt-4 because the navbar is sticky and usually needs 0 padding or handled by the page content */}
      <div>{children}</div>
    </div>
  );
}