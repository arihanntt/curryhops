import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  // SECURITY NOTICE:
  // Rename your environment variable in .env.local to ADMIN_PASSWORD
  // Do NOT use NEXT_PUBLIC_ for secrets!
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password !== correctPassword) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // Set Cookie
  res.cookies.set("admin-auth", "true", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    // 60 * 60 * 24 = 1 day. 
    // Change to 60 * 60 (1 hour) if you want them to log in more often.
    maxAge: 60 * 60 * 24, 
  });

  return res;
}