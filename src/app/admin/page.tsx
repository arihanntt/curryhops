import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
        <Link
  href="/admin/banner"
  className="rounded-xl border border-gray-800 p-6 hover:border-amber-500 transition"
>
  <h2 className="text-xl font-semibold mb-2 text-amber-400">
    🖼 Homepage Banner
  </h2>
  <p className="text-gray-400">
    Update homepage clickable banner
  </p>
</Link>

        <Link
          href="/admin/pdf"
          className="rounded-xl border border-gray-800 p-6 hover:border-amber-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-amber-400">
            📄 Menu PDF
          </h2>
          <p className="text-gray-400">
            Upload or replace menu PDF
          </p>
        </Link>

        <Link
          href="/admin/menu-editor"
          className="rounded-xl border border-gray-800 p-6 hover:border-amber-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-amber-400">
            🍽 Menu Editor
          </h2>
          <p className="text-gray-400">
            Add, update or delete menu items
          </p>
        </Link>
      </div>
    </div>
  );
}
