"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hospitalIcon, userLocationIcon } from './CustomMarker';

// Define hospital interface

interface Hospital {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  services: string[];
  rating: number;
  doctors: string[]; // <- Tambahan
}

// Sample data for hospitals
const sampleHospitals: Hospital[] = [
  {
    id: 1,
    name: "RSUD Dr. Soetomo",
    address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8",
    latitude: -7.2641,
    longitude: 112.7590,
    services: ["Unit Gawat Darurat (UGD) 24/7",
        "Rawat Inap",
        "Rawat Jalan",
        "Poliklinik Spesialis (22 spesialisasi termasuk Anestesiologi, Bedah Plastik, Kardiologi, Onkologi, Geriatri, Pediatri, Ortopedi)",
        "Medical Check-Up",
        "Diagnostik Lanjutan (MRI, CT Scan, Fluoroscopy, Panoramic, Ultrasound, Radiologi Intervensi)",
        "Radioterapi",
        "Pelatihan Penanganan Kegawatdaruratan Maternal dan Neonatal",
        "Pencegahan dan Pengendalian Infeksi",
        "Konseling Kesehatan Reproduksi",
        "Layanan Transplantasi (ginjal, kornea)"],
    rating: 4.5,
    doctors: ["Dr. Andi Setiawan", "Dr. Budi Hartono", "Dr. Clara Wijaya"] // <- Tambahan
  },
  {
    id: 2,
    name: "Rumah Sakit Universitas Airlangga",
    address: "Jl. Mayjen Prof. Dr. Moestopo No. 47, Surabaya",
    latitude: -7.267892,
    longitude: 112.758124,
    services: ["UGD 24 Jam",
        "Rawat Inap",
        "Rawat Jalan",
        "Poliklinik Spesialis (21 spesialisasi termasuk Mata, Onkologi, Kardiologi, Ortopedi, Neurologi)",
        "Medical Check-Up",
        "Diagnostik Lanjutan (CT Scan, MRI, USG 4D, Laboratorium)",
        "Rehabilitasi Medik",
        "Layanan Bedah (termasuk bedah mata dan onkologi)",
        "Farmasi 24 Jam",
        "Klinik Jantungan"],
    rating: 4.3,
    doctors: ["Dr. Dian Putri", "Dr. Edward Surya"] // <- Tambahan
  },
  {
    id: 3,
    name: "Rumah Sakit Islam Surabaya",
    address: "Jl. Achmad Yani No. 2-4, Wonokromo, Surabaya",
    latitude: -7.315427,
    longitude: 112.735689,
    services: ["UGD 24 Jam",
        "Rawat Inap",
        "Rawat Jalan (Reguler BPJS dan Eksekutif Non-BPJS)",
        "Poliklinik Spesialis (Kardiologi, Neurologi, Urologi, Anak, Penyakit Dalam, Mata, Ortopedi)",
        "Hemodialisis (30 mesin, single-use dialiser)",
        "Diagnostik Lanjutan (CT Scan, USG, Rontgen, Laboratorium)",
        "Layanan Bedah (4 kamar operasi, termasuk ortopedi dengan C-arm dan mata dengan phakoemulsifikasi)",
        "Klinik Fertilitas",
        "Rehabilitasi Medik (Terapi Okupasi, Terapi Wicara, Tumbuh Kembang Anak)",
        "Poli Laktasi (konsultasi ASI)",
        "Pemulasaran Jenazah",
        "Farmasi 24 Jam"],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"] // <- Tambahan
  },
  {
    id: 4,
    name: "Rumah Sakit Angkatan Laut Dr. Ramelan (RSAL)",
    address: "Jl. Gadung No. 1, Surabaya",
    latitude: -7.235678,
    longitude: 112.785432,
    services: ["UGD 24 Jam",
        "Rawat Inap",
        "Rawat Jalan",
        "Poliklinik Spesialis (Penyakit Dalam, Anak, Bedah, THT, Mata, Ortopedi)",
        "Diagnostik (Rontgen, USG, Laboratorium)",
        "Layanan Bedah Umum",
        "Rehabilitasi Medik",
        "Layanan Kedokteran Hiperbarik",
        ],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"]
  },
  {
    id: 5,
    name: "Rumah Sakit Wiyung Sejahtera",
    address: "Jl. Raya Menganti Wiyung No. 27, Surabaya",
    latitude: -7.316543,
    longitude: 112.674128,
    services: ["UGD 24 Jam",
        "Rawat Inap",
        "Rawat Jalan",
        "Poliklinik Spesialis (Anak, Penyakit Dalam, Bedah, THT, Mata)",
        "Diagnostik (Rontgen, USG, Laboratorium)",
        "Layanan Bedah Umum"
        ],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"]
  },
  {
    id: 6,
    name: "Rumah Sakit Muji Rahayu",
    address: "Jl. Raya Manukan Kulon No. 66, Surabaya",
    latitude: -7.256789,
    longitude: 112.678234,
    services: ["UGD 24 Jam",
        "Rawat Inap",
        "Rawat Jalan",
        "Poliklinik Spesialis (Penyakit Dalam, Anak, Bedah, THT, Mata)",
        "Diagnostik (USG, Rontgen, Laboratorium)",
        "Layanan Bedah Umum"
        ],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"]
  },
  {
    id: 7,
    name: "RSUD Husada Prima",
    address: "Jl. Karang Tembok No. 39, Surabaya",
    latitude: -7.234567,
    longitude: 112.759812,
    services: ["Rawat Inap",
      "Rawat Jalan",
      "IGD",
      "Poliklinik Spesialis (Bedah, Anak, Penyakit Dalam, dll.)",
      "Laboratorium",
      "Radiologi",
      "Bedah Laparoskopi",
      "Radiologi"
        ],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"]
  },
  {
    id: 8,
    name: "RS PKU Muhammadiyah Surabaya",
    address: "Jl. Raya Sutorejo No. 64, Dukuh Sutorejo, Kec. Mulyorejo, Surabaya",
    latitude: -7.230456,
    longitude: 112.780123,
    services: ["Rawat Inap",
      "Rawat Jalan",
      "IGD 24 Jam",
      "Poliklinik Spesialis (Penyakit Dalam, Anak, Bedah, THT, Mata, dll.)",
      "Laboratorium",
      "Radiologi",
      "Hemodialisis",
      "MCU",
      "Fisioterapi"
        ],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"]
  },
  {
    id: 9,
    name: "Rumah Sakit Surabaya Medical Service",
    address: "Jl. Kapuas No.2, Keputran, Kec. Tegalsari, Surabaya",
    latitude: -7.261354,
    longitude: 112.737942 ,
    services: ["Rawat Inap",
      "Rawat Jalan",
      "UGD 24 Jam",
      "Poliklinik Spesialis",
      "Laboratorium",
      "Radiologi"
        ],
    rating: 4.7,
    doctors: ["Dr. Fajar Prasetyo", "Dr. Gina Natalia"]
  }
];

// Component to recenter map to user location
function LocationMarker() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [locationFound, setLocationFound] = useState(false);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 13 });

    map.on('locationfound', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
      setLocationFound(true);
    });

    map.on('locationerror', () => {
      console.log('Location access denied or unavailable');
      // Default to Surabaya city center if location not found
      map.setView([-7.2575, 112.7521], 13);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={userLocationIcon}>
      <Popup>
        <div className="text-center">
          <p className="font-medium">Lokasi Anda</p>
          <p className="text-sm text-gray-600">Lat: {position[0].toFixed(4)}, Lng: {position[1].toFixed(4)}</p>
        </div>
      </Popup>
    </Marker>
  );
}

// Main Map Component
interface MapComponentProps {
  hospitals?: Hospital[];
  height?: string;
  showUserLocation?: boolean;
}

export default function MapComponent({
  hospitals = sampleHospitals,
  width = "600px",
  height = "600px",
  showUserLocation = true
}: MapComponentProps & { width?: string }) {
  const surabayaCenter: [number, number] = [-7.2575, 112.7521]; // Surabaya city center

  // Initialize Leaflet icons
  useEffect(() => {
    // No need to fix default icons as we're using custom icons
  }, []);

  return (
    <div style={{ height, width, borderRadius: '0.75rem', overflow: 'hidden' }}>
      <MapContainer
        center={surabayaCenter}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showUserLocation && <LocationMarker />}

        {hospitals.map((hospital) => (
          <Marker
            key={hospital.id}
            position={[hospital.latitude, hospital.longitude]}
            icon={hospitalIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-semibold text-lg mb-1">{hospital.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{hospital.address}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="text-sm">{hospital.rating}/5</span>
                </div>

                <div className="mb-2">
                  <p className="text-xs font-medium mb-1">Layanan:</p>
                  <div className="flex flex-wrap gap-1">
                    {hospital.services.map((service, i) => (
                      <span key={i} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-2">
                  <p className="text-xs font-medium mb-1">Dokter Tersedia:</p>
                  <ul className="text-xs text-gray-700 list-disc pl-4">
                    {hospital.doctors.map((doctor, index) => (
                      <li key={index}>{doctor}</li>
                    ))}
                  </ul>
                </div>

                <button className="w-full text-center bg-primary text-white text-sm py-1 px-3 rounded-md hover:bg-primary-dark transition-colors">
                  Lihat Detail
                </button>
              </div>
            </Popup>

          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
