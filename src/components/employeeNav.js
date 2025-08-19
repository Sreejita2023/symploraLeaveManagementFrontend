"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
        method: "POST",
        credentials: "include", // ensure cookies are sent
      });

      if (!res.ok) throw new Error("Failed to logout");

      alert("✅ Logout Successful!");
      router.push("/"); // redirect to homepage
    } catch (err) {
      console.error("Logout error:", err);
      alert("❌ Logout Failed!");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Employee Dashboard</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/employee" className="hover:underline">
            Home
          </Link>
          <Link href="/employee/leaveRequest" className="hover:underline">
            Leave Request
          </Link>
          <Link href="/employee/leaveResponse" className="hover:underline">
            Leave Response
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="fill-current h-4 w-4"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 flex flex-col">
          <Link href="/employee" className="hover:underline">
            Home
          </Link>
          <Link href="/employee/leaveRequest" className="hover:underline">
            Leave Request
          </Link>
          <Link href="/employee/leaveResponse" className="hover:underline">
            Leave Response
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
