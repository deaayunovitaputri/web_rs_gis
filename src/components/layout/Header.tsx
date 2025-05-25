"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="top-bar flex items-center justify-between p-3 border-b border-border">
        <div className="logo text-xl font-semibold text-text-primary">
          <Link href="/">Web GIS Rumah Sakit Surabaya</Link>
        </div>
        
        <div className="search-bar flex-1 max-w-md mx-4 relative hidden md:block">
          <div className="relative">
            <span className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Cari rumah sakit atau layanan..." 
              className="input-field py-2 pl-10"
            />  
          </div>
        </div>
        
        <div className="right-controls flex items-center gap-3">
          <div className="dropdown hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-border text-sm text-text-primary cursor-pointer hover:bg-gray-100 transition-colors">
            <span>Bahasa</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className="profile-icon w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          <div 
            className="mobile-toggle md:hidden cursor-pointer text-gray-500 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="menu-bar hidden md:flex justify-center p-2 border-b border-border">
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
      </div>
      
      {isMenuOpen && (
        <div className="mobile-menu flex flex-col gap-4 p-3 bg-white md:hidden">
          <div className="search-bar relative mb-2">
            <input 
              type="text" 
              placeholder="Cari rumah sakit atau layanan..." 
              className="input-field py-2"
            />
            <span className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          
          <Link href="/" className="text-base font-medium text-text-secondary hover:text-primary hover:bg-primary-light p-2 rounded-lg transition-colors">
            Beranda
          </Link>
          <Link href="/map" className="text-base font-medium text-text-secondary hover:text-primary hover:bg-primary-light p-2 rounded-lg transition-colors">
            Peta RS
          </Link>
          <Link href="/hospitals" className="text-base font-medium text-text-secondary hover:text-primary hover:bg-primary-light p-2 rounded-lg transition-colors">
            Daftar RS
          </Link>
          <Link href="/services" className="text-base font-medium text-text-secondary hover:text-primary hover:bg-primary-light p-2 rounded-lg transition-colors">
            Layanan RS
          </Link>
          <Link href="/about" className="text-base font-medium text-text-secondary hover:text-primary hover:bg-primary-light p-2 rounded-lg transition-colors">
            Tentang Kami
          </Link>
        </div>
      )}
    </nav>
  );
}
