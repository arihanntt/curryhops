import { connectDB } from "@/lib/mongodb";
import Pdf from "@/models/Pdf";

export async function GET() {
  await connectDB();

  const pdf = await Pdf.findOne();

  if (!pdf?.url) {
    return new Response("PDF not found", { status: 404 });
  }

  // IMPORTANT: add fl_attachment=false
  const pdfUrl = `${pdf.url}?fl_attachment=false`;

  const res = await fetch(pdfUrl);

  if (!res.ok || !res.body) {
    return new Response("Failed to fetch PDF", { status: 500 });
  }

  return new Response(res.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=menu.pdf",
    },
  });
}
