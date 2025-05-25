"use client";

import MainLayout from "../../components/layout/MainLayout";
import Link from "next/link";

// Define service interface
interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  hospitals: number;
}

// Sample data for services
const sampleServices: Service[] = [
  {
    id: 1,
    name: "UGD 24 Jam",
    description: "Layanan gawat darurat 24 jam dengan tenaga medis profesional untuk penanganan kasus darurat.",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    hospitals: 18
  },
  {
    id: 2,
    name: "Poli Umum",
    description: "Layanan pemeriksaan kesehatan umum untuk diagnosis dan pengobatan berbagai penyakit.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    hospitals: 25
  },
  {
    id: 3,
    name: "Poli Anak",
    description: "Layanan kesehatan khusus untuk anak-anak dengan dokter spesialis anak yang berpengalaman.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    hospitals: 20
  },
  {
    id: 4,
    name: "Poli Gigi",
    description: "Layanan perawatan kesehatan gigi dan mulut dengan peralatan modern dan dokter gigi profesional.",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    hospitals: 15
  },
  {
    id: 5,
    name: "Laboratorium",
    description: "Layanan pemeriksaan laboratorium dengan peralatan canggih untuk diagnosis yang akurat.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    hospitals: 22
  },
  {
    id: 6,
    name: "Radiologi",
    description: "Layanan pemeriksaan radiologi seperti X-ray, CT Scan, dan MRI dengan teknologi terkini.",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
    hospitals: 12
  },
  {
    id: 7,
    name: "ICU",
    description: "Layanan perawatan intensif untuk pasien dengan kondisi kritis yang membutuhkan pemantauan ketat.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    hospitals: 10
  },
  {
    id: 8,
    name: "Rawat Inap",
    description: "Layanan perawatan inap dengan fasilitas nyaman dan tenaga medis profesional 24 jam.",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    hospitals: 25
  },
  {
    id: 9,
    name: "Farmasi",
    description: "Layanan apotek dengan ketersediaan obat-obatan lengkap dan konsultasi kefarmasian.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    hospitals: 25
  }
];

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Layanan Rumah Sakit</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <p className="text-text-secondary mb-4">
            Temukan berbagai layanan kesehatan yang tersedia di rumah sakit di Surabaya. Kami menyediakan informasi lengkap tentang layanan-layanan yang dapat Anda akses di rumah sakit terdekat.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Layanan
              </label>
              <div className="relative">
                <span className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Nama layanan..." 
                  className="input-field py-2 pl-10"
                />
              </div>
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Berdasarkan
              </label>
              <select className="input-field py-2">
                <option>Semua Layanan</option>
                <option>Layanan Darurat</option>
                <option>Layanan Rawat Jalan</option>
                <option>Layanan Rawat Inap</option>
                <option>Layanan Penunjang</option>
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutkan Berdasarkan
              </label>
              <select className="input-field py-2">
                <option>Nama (A-Z)</option>
                <option>Jumlah Rumah Sakit (Terbanyak)</option>
                <option>Jumlah Rumah Sakit (Tersedikit)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleServices.map((service) => (
            <div key={service.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 bg-primary-light p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                  <p className="text-sm text-primary">
                    Tersedia di {service.hospitals} rumah sakit
                  </p>
                </div>
              </div>
              
              <p className="text-text-secondary mb-4 text-sm">
                {service.description}
              </p>
              
              <Link href={`/services/${service.id}`} className="btn-secondary text-center text-sm py-2 w-full block">
                Lihat Rumah Sakit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
