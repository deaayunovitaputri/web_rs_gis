"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MainLayout from "../../components/layout/MainLayout";
import hospitalsData from "../../data/hospitals.json";

const MapComponentWithNoSSR = dynamic(
  () => import("../../components/map/MapComponent"),
  { ssr: false }
);

type Hospital = {
  kode_rs: string;
  nama: string;
  deskripsi?: string;
  lokasi: {
    alamat: string;
    wilayah: string;
  };
  kontak: {
    telepon?: string;
    whatsapp?: string;
    email?: string;
  };
  layanan: string[];
  koordinat: {
    lat: number;
    lng: number;
  };
  jarak?: number;
};

export default function MapPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState("Semua");

  // Fungsi Haversine
  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Radius bumi (km)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Hitung jarak dari user ke setiap RS
        const updatedHospitals = hospitalsData.rumah_sakit.map((hospital) => {
          const rsLat = hospital.koordinat.lat;
          const rsLng = hospital.koordinat.lng;

          const distance = haversineDistance(userLat, userLng, rsLat, rsLng);
          return { ...hospital, jarak: parseFloat(distance.toFixed(2)) };
        });

        setHospitals(updatedHospitals);
      });
    }
  }, []);

  function isWithinDistance(hospitalDistance: number | undefined) {
    if (hospitalDistance === undefined) return false;
    if (maxDistance === "Semua") return true;
    const max = parseFloat(maxDistance.replace(" km", ""));
    return hospitalDistance <= max;
  }

  useEffect(() => {
    const filtered = hospitals.filter((hospital) => {
      const matchesSearch = hospital.nama
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesService =
        selectedServices.length === 0 ||
        selectedServices.every((service) =>
          hospital.layanan.includes(service)
        );

      const matchesDistance = isWithinDistance(hospital.jarak);

      return matchesSearch && matchesService && matchesDistance;
    });

    setFilteredHospitals(filtered);
  }, [hospitals, searchTerm, selectedServices, maxDistance]);

  const handleServiceChange = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

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
                  Layanan
                </label>
                <div className="space-y-2">
                  {[
                    "UGD 24 Jam",
                    "Poli Umum",
                    "Poli Anak",
                    "Poli Gigi",
                    "Laboratorium",
                    "Radiologi",
                    "ICU",
                    "Rawat Inap",
                  ].map((service, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`service-${index}`}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={selectedServices.includes(service)}
                        onChange={() => handleServiceChange(service)}
                      />
                      <label
                        htmlFor={`service-${index}`}
                        className="ml-2 text-sm text-gray-700"
                      >
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
                <select
                  className="input-field py-2 w-full border px-2"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                >
                  <option>1 km</option>
                  <option>3 km</option>
                  <option>5 km</option>
                  <option>10 km</option>
                  <option>Semua</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Rumah Sakit Terdekat</h2>
              <div className="space-y-3">
                {filteredHospitals.slice(0, 3).map((rs, i) => (
                  <div
                    key={i}
                    className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                  >
                    <h3 className="font-medium">{rs.nama}</h3>
                    <p className="text-sm text-gray-600">
                      Jarak: {rs.jarak ?? "-"} km
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {rs.layanan.map((service, j) => (
                        <span
                          key={j}
                          className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <MapComponentWithNoSSR height="500px" width="100%" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
