"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import MainLayout from "../../../components/layout/MainLayout";
import dynamic from "next/dynamic";

// Dynamically import the MapComponent to avoid SSR issues with Leaflet
const MapComponentWithNoSSR = dynamic(
  () => import("../../../components/map/MapComponent"),
  { ssr: false }
);

// Define service interface
interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  longDescription: string;
  hospitals: Hospital[];
}

// Define hospital interface
interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance?: number;
  latitude: number;
  longitude: number;
  services: string[];
}

// Sample data for services
const sampleServices: Service[] = [
  {
    id: 1,
    name: "UGD 24 Jam",
    description: "Layanan gawat darurat 24 jam dengan tenaga medis profesional untuk penanganan kasus darurat.",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
    longDescription: "Unit Gawat Darurat (UGD) 24 jam adalah layanan medis yang tersedia sepanjang waktu untuk menangani kondisi medis darurat yang mengancam jiwa atau memerlukan penanganan segera. UGD dilengkapi dengan peralatan medis modern dan ditangani oleh tim medis yang terlatih khusus dalam penanganan kasus gawat darurat. Layanan ini mencakup penanganan trauma, serangan jantung, stroke, kecelakaan, dan kondisi darurat lainnya yang membutuhkan respons cepat dan tepat.",
    hospitals: [
      {
        id: 1,
        name: "RSUD Dr. Soetomo",
        address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota Surabaya",
        phone: "(031) 5501078",
        rating: 4.5,
        latitude: -7.2647,
        longitude: 112.7583,
        services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "ICU"]
      },
      {
        id: 2,
        name: "RS Siloam Surabaya",
        address: "Jl. Raya Gubeng No.70, Gubeng, Kec. Gubeng, Kota Surabaya",
        phone: "(031) 5031333",
        rating: 4.3,
        latitude: -7.2741,
        longitude: 112.7449,
        services: ["UGD 24 Jam", "Poli Spesialis", "Radiologi", "Farmasi"]
      },
      {
        id: 3,
        name: "RS Premier Surabaya",
        address: "Jl. Nginden Intan Barat No.2, Nginden Jangkungan, Kec. Sukolilo, Kota Surabaya",
        phone: "(031) 5993211",
        rating: 4.7,
        latitude: -7.3016,
        longitude: 112.7688,
        services: ["UGD 24 Jam", "Poli Umum", "Poli Anak", "Poli Gigi"]
      },
      {
        id: 4,
        name: "RSUD Bhakti Dharma Husada",
        address: "Jl. Kendung No.115-117, Sememi, Kec. Benowo, Kota Surabaya",
        phone: "(031) 99245100",
        rating: 4.2,
        latitude: -7.2308,
        longitude: 112.6359,
        services: ["UGD 24 Jam", "Poli Umum", "Poli Anak", "Poli Gigi"]
      },
      {
        id: 5,
        name: "RS Adi Husada Kapasari",
        address: "Jl. Kapasari No.97-101, Kapasan, Kec. Simokerto, Kota Surabaya",
        phone: "(031) 3764555",
        rating: 4.0,
        latitude: -7.2437,
        longitude: 112.7478,
        services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "Laboratorium"]
      }
    ]
  },
  {
    id: 2,
    name: "Poli Umum",
    description: "Layanan pemeriksaan kesehatan umum untuk diagnosis dan pengobatan berbagai penyakit.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    longDescription: "Poli Umum adalah layanan kesehatan dasar yang menyediakan pemeriksaan, diagnosis, dan pengobatan untuk berbagai kondisi kesehatan umum. Layanan ini ditangani oleh dokter umum yang memiliki pengetahuan luas tentang berbagai penyakit dan kondisi kesehatan. Poli Umum menjadi pintu masuk utama bagi pasien sebelum dirujuk ke layanan spesialis jika diperlukan. Layanan ini mencakup pemeriksaan fisik, konsultasi kesehatan, penanganan penyakit ringan, dan tindakan medis sederhana.",
    hospitals: [
      {
        id: 1,
        name: "RSUD Dr. Soetomo",
        address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota Surabaya",
        phone: "(031) 5501078",
        rating: 4.5,
        latitude: -7.2647,
        longitude: 112.7583,
        services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "ICU"]
      },
      {
        id: 3,
        name: "RS Premier Surabaya",
        address: "Jl. Nginden Intan Barat No.2, Nginden Jangkungan, Kec. Sukolilo, Kota Surabaya",
        phone: "(031) 5993211",
        rating: 4.7,
        latitude: -7.3016,
        longitude: 112.7688,
        services: ["UGD 24 Jam", "Poli Umum", "Poli Anak", "Poli Gigi"]
      },
      {
        id: 4,
        name: "RSUD Bhakti Dharma Husada",
        address: "Jl. Kendung No.115-117, Sememi, Kec. Benowo, Kota Surabaya",
        phone: "(031) 99245100",
        rating: 4.2,
        latitude: -7.2308,
        longitude: 112.6359,
        services: ["UGD 24 Jam", "Poli Umum", "Poli Anak", "Poli Gigi"]
      },
      {
        id: 5,
        name: "RS Adi Husada Kapasari",
        address: "Jl. Kapasari No.97-101, Kapasan, Kec. Simokerto, Kota Surabaya",
        phone: "(031) 3764555",
        rating: 4.0,
        latitude: -7.2437,
        longitude: 112.7478,
        services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "Laboratorium"]
      }
    ]
  }
];

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    // In a real app, fetch service data based on the ID
    // For now, we'll use sample data
    const serviceId = Number(params.id);
    const foundService = sampleServices.find(s => s.id === serviceId);
    setService(foundService || null);
    
    if (foundService) {
      setFilteredHospitals(foundService.hospitals);
    }
  }, [params.id]);

  useEffect(() => {
    if (service && searchQuery) {
      const filtered = service.hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredHospitals(filtered);
    } else if (service) {
      setFilteredHospitals(service.hospitals);
    }
  }, [searchQuery, service]);

  if (!service) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/services" className="text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Daftar Layanan
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-start mb-6">
              <div className="flex-shrink-0 bg-primary-light p-4 rounded-lg mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                <p className="text-text-secondary mb-2">
                  Tersedia di {service.hospitals.length} rumah sakit di Surabaya
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Tentang Layanan</h2>
              <p className="text-text-secondary">
                {service.longDescription}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari Rumah Sakit
                </label>
                <div className="relative">
                  <span className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                  <input 
                    type="text" 
                    placeholder="Nama atau alamat rumah sakit..." 
                    className="input-field py-2 pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jarak Maksimum
                </label>
                <select className="input-field py-2">
                  <option>1 km</option>
                  <option>3 km</option>
                  <option>5 km</option>
                  <option>10 km</option>
                  <option>Semua</option>
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
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h2 className="text-lg font-semibold mb-4">Rumah Sakit dengan {service.name}</h2>
              
              {filteredHospitals.length === 0 ? (
                <p className="text-text-secondary">Tidak ada rumah sakit yang ditemukan.</p>
              ) : (
                <div className="space-y-4">
                  {filteredHospitals.map((hospital) => (
                    <div key={hospital.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                      <Link href={`/hospitals/${hospital.id}`}>
                        <h3 className="font-medium hover:text-primary transition-colors">{hospital.name}</h3>
                      </Link>
                      <p className="text-sm text-gray-600 mb-1">{hospital.address}</p>
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-xs text-gray-600">{hospital.rating}/5</span>
                        </div>
                        {hospital.distance && (
                          <span className="ml-3 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {hospital.distance} km
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {hospital.services.slice(0, 3).map((service, i) => (
                          <span key={i} className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                            {service}
                          </span>
                        ))}
                        {hospital.services.length > 3 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            +{hospital.services.length - 3} lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Peta Rumah Sakit</h2>
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapComponentWithNoSSR 
                  height="100%" 
                  hospitals={filteredHospitals}
                  showUserLocation={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
