"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/employeeNav";

export default function RequestedLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/requestedLeave`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        setLeaves(data.data || []);
      } catch (err) {
        console.error("Error fetching leaves:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

  // Delete leave
  const handleDelete = async (leaveId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/delete/${leaveId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete leave");

      alert("✅ Leave deleted successfully!");
      // remove from UI
      setLeaves((prev) => prev.filter((leave) => leave._id !== leaveId));
    } catch (err) {
      console.error("Error deleting leave:", err);
      alert("❌ Failed to delete leave");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Requested Leaves</h2>
        {leaves.length === 0 ? (
          <p className="text-gray-600">No leave requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaves.map((leave) => (
              <div
                key={leave._id}
                className="bg-white p-4 shadow rounded-lg border border-gray-200"
              >
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {leave.startDate}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span>{" "}
                  {leave.endDate}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-blue-600">{leave.status}</span>
                </p>
                <button
                  onClick={() => handleDelete(leave._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
