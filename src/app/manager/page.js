"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/managerNav";
export default function ManagerPage() {
  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultProfile = "https://geographyandyou.com/images/user-profile.png";

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/viewEmployee`, {
          method: "GET",
          credentials: "include", // include cookies
        });

        if (!res.ok) throw new Error("Failed to fetch manager data");

        const result = await res.json();
        setManager(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchManager();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading Manager Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar/>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Manager Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-6 mb-8">
          <Image
            src={defaultProfile}
            alt="Manager Profile"
            className="w-20 h-20 rounded-full shadow"
            width={80} // required
            height={80}
          />
          <div>
            <h2 className="text-xl font-bold">{manager.name}</h2>
            <p className="text-gray-600">{manager.email}</p>
          </div>
        </div>

        {/* Employees Section */}
        <h2 className="text-lg font-semibold mb-4">Employees</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {manager.employees && manager.employees.length > 0 ? (
            manager.employees.map((emp) => (
              <div
                key={emp._id}
                className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4"
              >
                <Image
                  src={defaultProfile}
                  alt="Employee"
                  className="w-16 h-16 rounded-full shadow"
                  width={40} // required
                  height={40}
                />
                <div>
                  <h3 className="font-semibold">{emp.name}</h3>
                  <p className="text-sm text-gray-600">{emp.email}</p>
                  <p className="text-sm text-gray-800">
                    Leaves: {emp.noOfLeaves}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No employees found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
