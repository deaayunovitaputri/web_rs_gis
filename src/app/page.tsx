"use client";

import Link from "next/link";
import Image from "next/image";
import MainLayout from "../components/layout/MainLayout";
import dynamic from "next/dynamic";
import { useEffect } from "react"; // Tambahkan ini
import { useRouter } from "next/navigation"; // Tambahkan ini

const MapComponent = dynamic(() => import("@/components/map/MapComponent"), { ssr: false });



export default function Home() {
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        className="hero min-h-screen bg-cover bg-center text-white py-20 relative"
        style={{ backgroundImage: "url('/image/bg.png')" }}
      >
        <div className="container mx-auto px-4 text-center pt-32 md:pt-40">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Temukan Rumah Sakit Terdekat di Surabaya
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90">
            Cari rumah sakit dengan layanan yang Anda butuhkan berdasarkan lokasi terdekat Anda
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/map" className="btn-primary flex items-center justify-center gap-2">
              Buka Peta
            </Link>
            <Link href="/hospitals" className="btn-secondary flex items-center justify-center gap-2">
              Lihat Daftar RS
            </Link>
          </div>
        </div>


        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
      </section>



      {/* Features Section */}
      <section className="features py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Fitur Utama</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-pink-400">
              <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Pencarian Berdasarkan Lokasi</h3>
              <p className="text-white">Temukan rumah sakit terdekat dari lokasi Anda dengan mudah dan cepat</p>
            </div>

            <div className="feature-card text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-blue-300">
              <div className="w-16 h-16 bg-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-11 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Filter Berdasarkan Layanan</h3>
              <p className="text-white">Filter rumah sakit berdasarkan layanan kesehatan yang Anda butuhkan</p>
            </div>

            <div className="feature-card text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-orange-300">
              <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Informasi Lengkap</h3>
              <p className="text-white">Dapatkan informasi lengkap tentang rumah sakit, layanan, dan kontak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Peta Rumah Sakit di Surabaya</h2>
          <p className="text-center mt-0 mb-6">Temukan rumah sakit berdasarkan kebutuhan khusus Anda dengan berbagai opsi pencarian</p>

          {/* Map sticky di bawah navbar */}
          <div className="flex justify-center sticky top-[70px] z-20 bg-white py-4">
            <MapComponent height="350px" width="1000px" />
          </div>

          {/* Button sticky tetap di bawah peta, tidak ikut ke atas */}
          <div className="flex flex-col md:flex-row justify-center gap-4 sticky top-[450px] z-20 bg-white py-4">
            <Link href="/map" className="btn-primary flex items-center justify-center gap-2">
              {/* Icon Peta */}
              <svg
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <polygon
                  points="15 6 9 4 3 6 3 20 9 18 15 20 21 18 21 4 15 6"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fill="none"
                />
                <polygon
                  points="15 20 9 18 9 4 15 6 15 20"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              Buka Peta
            </Link>
          </div>

        </div>
      </section>
    </MainLayout>
  );
}
