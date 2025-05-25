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
}

// Sample data for hospitals
const sampleHospitals: Hospital[] = [
  {
    id: 1,
    name: "RSUD Dr. Soetomo",
    address: "Jl. Mayjen Prof. Dr. Moestopo No.6-8",
    latitude: -7.2641,
    longitude: 112.7590,
    services: ["UGD 24 Jam", "Poli Umum", "Rawat Inap", "ICU"],
    rating: 4.5
  },
  {
    id: 2,
    name: "RS Siloam Surabaya",
    address: "Jl. Raya Gubeng No.70",
    latitude: -7.2753,
    longitude: 112.7477,
    services: ["UGD 24 Jam", "Poli Spesialis", "Radiologi", "Farmasi"],
    rating: 4.3
  },
  {
    id: 3,
    name: "RS Premier Surabaya",
    address: "Jl. Nginden Intan Barat No.2",
    latitude: -7.2992,
    longitude: 112.7672,
    services: ["Poli Umum", "Poli Anak", "Poli Gigi", "Laboratorium"],
    rating: 4.7
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
  height = "600px",
  showUserLocation = true
}: MapComponentProps) {
  const surabayaCenter: [number, number] = [-7.2575, 112.7521]; // Surabaya city center
  
  // Initialize Leaflet icons
  useEffect(() => {
    // No need to fix default icons as we're using custom icons
  }, []);
  
  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer 
        center={surabayaCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
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
