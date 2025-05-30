"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo di kiri */}
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/image/logo.png"
              alt="Logo"
              width={200}
              height={80}
              className="object-contain"
            />
          </div>
        </Link>

        {/* Menu bar */}
        <div className="menu-bar hidden md:flex space-x-4">
          <Link href="/" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-b-2 hover:border-primary transition-colors">
            Beranda
          </Link>
          <Link href="/map" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-b-2 hover:border-primary transition-colors">
            Peta RS
          </Link>
          <Link href="/hospitals" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-b-2 hover:border-primary transition-colors">
            Daftar RS
          </Link>
          <Link href="/services" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-b-2 hover:border-primary transition-colors">
            Layanan RS
          </Link>
          <Link href="/about" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-b-2 hover:border-primary transition-colors">
            Tentang Kami
          </Link>
          <Link href="/admin/login" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary hover:border-b-2 hover:border-primary transition-colors">
             Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
