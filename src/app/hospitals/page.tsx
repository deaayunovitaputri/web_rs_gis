"use client";

import MainLayout from "../../components/layout/MainLayout";
import Link from "next/link";

// Define hospital interface
interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  operatingHours: string;
  services: string[];
  rating: number;
  image: string;
}

// Sample data for hospitals
const sampleHospitals: Hospital[] = [
  {
    id: 1,
    name: "RSUD Dr. Soetomo",
    address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota Surabaya",
    phone: "(031) 5501078",
    operatingHours: "24 Jam",
    services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "ICU", "Radiologi", "Laboratorium"],
    rating: 4.5,
    image: "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=RSUD+Dr.+Soetomo"
  },
  {
    id: 2,
    name: "RS Siloam Surabaya",
    address: "Jl. Raya Gubeng No.70, Gubeng, Kec. Gubeng, Kota Surabaya",
    phone: "(031) 5031333",
    operatingHours: "24 Jam",
    services: ["UGD 24 Jam", "Poli Spesialis", "Radiologi", "Farmasi", "Laboratorium", "Medical Check-Up"],
    rating: 4.3,
    image: "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=RS+Siloam"
  },
  {
    id: 3,
    name: "RS Premier Surabaya",
    address: "Jl. Nginden Intan Barat No.2, Nginden Jangkungan, Kec. Sukolilo, Kota Surabaya",
    phone: "(031) 5993211",
    operatingHours: "24 Jam",
    services: ["Poli Umum", "Poli Anak", "Poli Gigi", "Laboratorium", "Radiologi", "Farmasi"],
    rating: 4.7,
    image: "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=RS+Premier"
  },
  {
    id: 4,
    name: "RSUD Bhakti Dharma Husada",
    address: "Jl. Kendung No.115-117, Sememi, Kec. Benowo, Kota Surabaya",
    phone: "(031) 99245100",
    operatingHours: "24 Jam",
    services: ["UGD 24 Jam", "Poli Umum", "Poli Anak", "Poli Gigi", "Laboratorium"],
    rating: 4.2,
    image: "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=RSUD+BDH"
  },
  {
    id: 5,
    name: "RS Adi Husada Kapasari",
    address: "Jl. Kapasari No.97-101, Kapasan, Kec. Simokerto, Kota Surabaya",
    phone: "(031) 3764555",
    operatingHours: "24 Jam",
    services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "Laboratorium", "Radiologi"],
    rating: 4.0,
    image: "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=RS+Adi+Husada"
  },
  {
    id: 6,
    name: "RS Mitra Keluarga Kenjeran",
    address: "Jl. Kenjeran No.506, Kalijudan, Kec. Mulyorejo, Kota Surabaya",
    phone: "(031) 99000880",
    operatingHours: "24 Jam",
    services: ["UGD 24 Jam", "Poli Spesialis", "Radiologi", "Laboratorium", "Farmasi"],
    rating: 4.6,
    image: "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=RS+Mitra+Keluarga"
  }
];

export default function HospitalsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Daftar Rumah Sakit Surabaya</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Rumah Sakit
              </label>
              <input 
                type="text" 
                placeholder="Nama rumah sakit..." 
                className="input-field py-2"
              />
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter Layanan
              </label>
              <select className="input-field py-2">
                <option>Semua Layanan</option>
                <option>UGD 24 Jam</option>
                <option>Poli Umum</option>
                <option>Poli Anak</option>
                <option>Poli Gigi</option>
                <option>Laboratorium</option>
                <option>Radiologi</option>
                <option>ICU</option>
              </select>
            </div>
            
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutkan Berdasarkan
              </label>
              <select className="input-field py-2">
                <option>Nama (A-Z)</option>
                <option>Rating Tertinggi</option>
                <option>Jarak Terdekat</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleHospitals.map((hospital) => (
            <div key={hospital.id} className="card hover:shadow-lg transition-shadow">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>
              <div className="flex items-center mb-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{hospital.rating}/5</span>
                </div>
              </div>
              <p className="flex items-start mb-2 text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {hospital.address}
              </p>
              <p className="flex items-start mb-2 text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {hospital.phone}
              </p>
              <p className="flex items-start mb-3 text-text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {hospital.operatingHours}
              </p>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Layanan:</p>
                <div className="flex flex-wrap gap-2">
                  {hospital.services.slice(0, 3).map((service, i) => (
                    <span key={i} className="text-xs bg-primary-light text-primary px-2 py-1 rounded-full">
                      {service}
                    </span>
                  ))}
                  {hospital.services.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{hospital.services.length - 3} lainnya
                    </span>
                  )}
                </div>
              </div>
              <Link href={`/hospitals/${hospital.id}`} className="btn-secondary text-center text-sm py-2 w-full block">
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-1">
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Sebelumnya
            </button>
            <button className="px-4 py-2 border border-primary bg-primary text-white rounded-md text-sm font-medium">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
