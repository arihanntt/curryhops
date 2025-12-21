export default function MenuPdfPage() {
  return (
    <div className="min-h-screen bg-black">
      <iframe
        src="/api/menu-pdf/view"
        className="w-full h-screen"
        title="Menu PDF"
      />
    </div>
  );
}
