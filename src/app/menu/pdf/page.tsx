export default function MenuPdfPage() {
  return (
    <iframe
      src={`/api/menu-pdf/view?v=${Date.now()}`}
      className="w-full h-screen"
      title="Menu PDF"
    />
  );
}
