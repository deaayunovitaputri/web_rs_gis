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

// Define hospital interface
interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  operatingHours: string;
  services: string[];
  facilities: string[];
  doctors: Doctor[];
  rating: number;
  reviews: Review[];
  image: string;
  latitude: number;
  longitude: number;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

// Sample data for a hospital
const sampleHospital: Hospital = {
  id: 1,
  name: "RSUD Dr. Soetomo",
  address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8, Airlangga, Kec. Gubeng, Kota Surabaya",
  phone: "(031) 5501078",
  operatingHours: "24 Jam",
  services: [
    "UGD 24 Jam", 
    "Poli Umum", 
    "Poli Anak", 
    "Poli Gigi", 
    "Rawat Inap", 
    "ICU", 
    "Radiologi", 
    "Laboratorium"
  ],
  facilities: [
    "Parkir Luas",
    "Kantin",
    "ATM Center",
    "Apotek",
    "Mushola",
    "Wifi",
    "Ambulance"
  ],
  doctors: [
    {
      id: 1,
      name: "dr. Agus Suryanto, Sp.PD",
      specialty: "Spesialis Penyakit Dalam",
      image: "https://placehold.co/300x300/3B82F6/FFFFFF/png?text=dr.+Agus"
    },
    {
      id: 2,
      name: "dr. Budi Santoso, Sp.A",
      specialty: "Spesialis Anak",
      image: "https://placehold.co/300x300/3B82F6/FFFFFF/png?text=dr.+Budi"
    },
    {
      id: 3,
      name: "dr. Citra Dewi, Sp.OG",
      specialty: "Spesialis Obstetri & Ginekologi",
      image: "https://placehold.co/300x300/3B82F6/FFFFFF/png?text=dr.+Citra"
    }
  ],
  rating: 4.5,
  reviews: [
    {
      id: 1,
      user: "Ahmad",
      rating: 5,
      comment: "Pelayanan sangat baik dan cepat. Dokter dan perawat sangat profesional.",
      date: "12 Mei 2023"
    },
    {
      id: 2,
      user: "Budi",
      rating: 4,
      comment: "Fasilitas lengkap dan bersih. Antrian cukup teratur.",
      date: "23 April 2023"
    },
    {
      id: 3,
      user: "Citra",
      rating: 4,
      comment: "Dokter sangat informatif dan menjelaskan dengan detail. Hanya saja waktu tunggu cukup lama.",
      date: "5 Maret 2023"
    }
  ],
  image: "https://placehold.co/800x400/3B82F6/FFFFFF/png?text=RSUD+Dr.+Soetomo",
  latitude: -7.2647,
  longitude: 112.7583
};

export default function HospitalDetailPage() {
  const params = useParams();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    // In a real app, fetch hospital data based on the ID
    // For now, we'll use sample data
    setHospital(sampleHospital);
  }, [params.id]);

  if (!hospital) {
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
          <Link href="/hospitals" className="text-primary flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali ke Daftar Rumah Sakit
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{hospital.name}</h1>
                <p className="flex items-start text-text-secondary mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {hospital.address}
                </p>
              </div>
              
              <div className="flex items-center mt-2 md:mt-0">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(hospital.rating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{hospital.rating}/5 ({hospital.reviews.length} ulasan)</span>
                </div>
              </div>
            </div>
            
            <div className="flex border-b border-gray-200 mb-6">
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'info' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('info')}
              >
                Informasi
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'services' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('services')}
              >
                Layanan & Fasilitas
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'doctors' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('doctors')}
              >
                Dokter
              </button>
              <button 
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('reviews')}
              >
                Ulasan
              </button>
            </div>
            
            {activeTab === 'info' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Informasi Kontak</h2>
                    <p className="flex items-start mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {hospital.phone}
                    </p>
                    <p className="flex items-start mb-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {hospital.operatingHours}
                    </p>
                    <p className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <a href="#" className="text-primary">Kunjungi Website</a>
                    </p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Lokasi</h2>
                    <div className="h-48 rounded-lg overflow-hidden">
                      <MapComponentWithNoSSR 
                        height="100%" 
                        hospitals={[{
                          id: hospital.id,
                          name: hospital.name,
                          address: hospital.address,
                          latitude: hospital.latitude,
                          longitude: hospital.longitude,
                          services: hospital.services,
                          rating: hospital.rating
                        }]}
                        showUserLocation={true}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Tentang {hospital.name}</h2>
                  <p className="text-text-secondary mb-4">
                    {hospital.name} adalah salah satu rumah sakit terkemuka di Surabaya yang menyediakan layanan kesehatan komprehensif dengan standar kualitas tinggi. Rumah sakit ini dilengkapi dengan fasilitas modern dan didukung oleh tim medis yang profesional dan berpengalaman.
                  </p>
                  <p className="text-text-secondary">
                    Dengan komitmen untuk memberikan pelayanan terbaik, {hospital.name} terus meningkatkan kualitas layanan dan fasilitas untuk memenuhi kebutuhan kesehatan masyarakat Surabaya dan sekitarnya.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'services' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Layanan</h2>
                    <ul className="space-y-2">
                      {hospital.services.map((service, index) => (
                        <li key={index} className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Fasilitas</h2>
                    <ul className="space-y-2">
                      {hospital.facilities.map((facility, index) => (
                        <li key={index} className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {facility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'doctors' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Dokter</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hospital.doctors.map((doctor) => (
                    <div key={doctor.id} className="text-center">
                      <div className="mb-3 mx-auto w-24 h-24 rounded-full overflow-hidden">
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-medium">{doctor.name}</h3>
                      <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Ulasan ({hospital.reviews.length})</h2>
                  <button className="btn-primary text-sm">Tulis Ulasan</button>
                </div>
                
                <div className="space-y-6">
                  {hospital.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{review.user}</h3>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-text-secondary">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
