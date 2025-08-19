"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/employeeNav";

export default function ProfilePage() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const today = tomorrow.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveMessage, setLeaveMessage] = useState("");

  // Fetch employee profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
          method: "GET",
          credentials: "include", // ensures cookies are sent
        });
        console.log("res", res);
        if (!res.ok) throw new Error("Failed to fetch profile");
        const result = await res.json();
        setEmployee(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Create leave request
  const handleCreateLeave = async () => {
    try {
      setLeaveMessage("");
      console.log("startDate", startDate);
      console.log("endDate", endDate);
      console.log(JSON.stringify({ startDate, endDate }));
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/request/send/applied`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startDate, endDate }),
          credentials: "include",
        }
      );
      // const data = await res.json();
      console.log("res1", res);
      if (!res.ok) throw new Error("Failed to create leave request");

      setLeaveMessage("✅ Leave request created successfully!");
      
      // console.log("Leave response:", data);
    } catch (err) {
      console.log("err", err);
      setLeaveMessage(`❌ ${err}`);
    }
    finally {
      setStartDate("");
      setEndDate("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading profile...
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
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Employee Profile
          </h1>

          {/* Employee Details */}
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name:</span> {employee.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {employee.email}
            </p>
            <p>
              <span className="font-semibold">Department:</span>{" "}
              {employee.department}
            </p>
            <p>
              <span className="font-semibold">Available Leaves:</span>{" "}
              {employee.noOfLeaves}
            </p>
          </div>

          {/* Manager Details */}
          <div className="space-y-2 mt-4 border-t pt-4">
            <h2 className="text-lg font-semibold">Manager</h2>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {employee.managerId?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {employee.managerId?.email}
            </p>
          </div>

          {/* Leave Request Form */}
          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold">Create Leave Request</h2>
            <input
              type="date"
              value={startDate}
              min={today} // prevents past dates
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              value={endDate}
              min={startDate === "" ? today : startDate} // prevents past dates
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateLeave}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Create Leave
            </button>
            {leaveMessage && (
              <p className="text-center text-sm mt-2">{leaveMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
