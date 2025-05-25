"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Link from "next/link";

// Define statistics interface
interface DashboardStats {
  totalHospitals: number;
  totalServices: number;
  totalUsers: number;
  recentActivity: Activity[];
}

interface Activity {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalHospitals: 0,
    totalServices: 0,
    totalUsers: 0,
    recentActivity: []
  });

  useEffect(() => {
    // In a real app, fetch data from API
    // For demo, we'll use sample data
    setStats({
      totalHospitals: 25,
      totalServices: 48,
      totalUsers: 120,
      recentActivity: [
        {
          id: 1,
          action: "Tambah Rumah Sakit",
          user: "Admin",
          timestamp: "25 Mei 2025, 13:42",
          details: "Menambahkan RS Mitra Keluarga Kenjeran"
        },
        {
          id: 2,
          action: "Update Layanan",
          user: "Admin",
          timestamp: "25 Mei 2025, 12:30",
          details: "Memperbarui layanan di RSUD Dr. Soetomo"
        },
        {
          id: 3,
          action: "Hapus Pengguna",
          user: "Admin",
          timestamp: "24 Mei 2025, 16:15",
          details: "Menghapus pengguna tidak aktif"
        },
        {
          id: 4,
          action: "Update Rumah Sakit",
          user: "Admin",
          timestamp: "24 Mei 2025, 10:22",
          details: "Memperbarui informasi RS Premier Surabaya"
        },
        {
          id: 5,
          action: "Tambah Layanan",
          user: "Admin",
          timestamp: "23 Mei 2025, 14:50",
          details: "Menambahkan layanan baru: Poli Jantung"
        }
      ]
    });
  }, []);

  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {/* Stats cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Rumah Sakit
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.totalHospitals}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/admin/hospitals" className="font-medium text-primary hover:text-primary-dark">
                  Lihat semua
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Layanan
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.totalServices}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/admin/services" className="font-medium text-primary hover:text-primary-dark">
                  Lihat semua
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-light rounded-md p-3">
                  <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Pengguna
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stats.totalUsers}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <Link href="/admin/users" className="font-medium text-primary hover:text-primary-dark">
                  Lihat semua
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Aktivitas Terbaru</h2>
            <Link href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
              Lihat semua aktivitas
            </Link>
          </div>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {stats.recentActivity.map((activity) => (
                <li key={activity.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary">{activity.action}</div>
                          <div className="text-sm text-gray-500">{activity.details}</div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <div className="text-sm text-gray-500">{activity.timestamp}</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Aksi Cepat</h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <svg className="mx-auto h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tambah Rumah Sakit</h3>
                <p className="mt-1 text-sm text-gray-500">Tambahkan data rumah sakit baru ke database.</p>
                <div className="mt-3">
                  <Link href="/admin/hospitals/add" className="text-sm font-medium text-primary hover:text-primary-dark">
                    Tambah Rumah Sakit
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <svg className="mx-auto h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tambah Layanan</h3>
                <p className="mt-1 text-sm text-gray-500">Tambahkan layanan baru untuk rumah sakit.</p>
                <div className="mt-3">
                  <Link href="/admin/services/add" className="text-sm font-medium text-primary hover:text-primary-dark">
                    Tambah Layanan
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <svg className="mx-auto h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Tambah Pengguna</h3>
                <p className="mt-1 text-sm text-gray-500">Tambahkan pengguna baru ke sistem.</p>
                <div className="mt-3">
                  <Link href="/admin/users/add" className="text-sm font-medium text-primary hover:text-primary-dark">
                    Tambah Pengguna
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6 text-center">
                <svg className="mx-auto h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Laporan</h3>
                <p className="mt-1 text-sm text-gray-500">Lihat dan unduh laporan sistem.</p>
                <div className="mt-3">
                  <Link href="/admin/reports" className="text-sm font-medium text-primary hover:text-primary-dark">
                    Lihat Laporan
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
