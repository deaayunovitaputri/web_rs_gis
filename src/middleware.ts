import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Cek jika user sudah login (misal pakai cookie)
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value;

  // Jika belum login dan bukan di halaman /login, redirect ke /login
  if (!isLoggedIn && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login atau di halaman /login, lanjutkan
  return NextResponse.next();
}

// Tentukan path yang ingin diproteksi
export const config = {
  matcher: ["/((?!login|_next|favicon.ico).*)"], // Semua kecuali /login dan file statis
};