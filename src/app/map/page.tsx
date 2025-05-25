"use client";

import MainLayout from "../../components/layout/MainLayout";
import dynamic from "next/dynamic";

// Dynamically import the MapComponent to avoid SSR issues with Leaflet
const MapComponentWithNoSSR = dynamic(
  () => import("../../components/map/MapComponent"),
  { ssr: false }
);

export default function MapPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Peta Rumah Sakit Surabaya</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filter Panel */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h2 className="text-lg font-semibold mb-4">Filter Rumah Sakit</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cari Rumah Sakit
                </label>
                <input 
                  type="text" 
                  placeholder="Nama rumah sakit..." 
                  className="input-field py-2"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Layanan
                </label>
                <div className="space-y-2">
                  {[
                    "UGD 24 Jam", "Poli Umum", "Poli Anak", "Poli Gigi", 
                    "Laboratorium", "Radiologi", "ICU", "Rawat Inap"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`service-${index}`} 
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor={`service-${index}`} className="ml-2 text-sm text-gray-700">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
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
              
              <button className="btn-primary w-full">
                Terapkan Filter
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Rumah Sakit Terdekat</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <h3 className="font-medium">RS Premier Surabaya</h3>
                    <p className="text-sm text-gray-600">Jarak: 1.2 km</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                        UGD 24 Jam
                      </span>
                      <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                        Poli Umum
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <MapComponentWithNoSSR height="600px" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
