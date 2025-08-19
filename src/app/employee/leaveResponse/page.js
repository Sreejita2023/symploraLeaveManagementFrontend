"use client";
import { useEffect, useState } from "react";
import NavBar from "@/components/employeeNav";

export default function ReviewedLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviewed leaves
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviewedLeave`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setLeaves(data.data || []);
      } catch (err) {
        console.error("Error fetching reviewed leaves:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaves();
  }, []);

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
        <h2 className="text-2xl font-bold mb-6">Reviewed Leaves</h2>

        {leaves.length === 0 ? (
          <p className="text-gray-600">No reviewed leaves available.</p>
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
                  <span
                    className={
                      leave.status === "approved"
                        ? "text-green-600 font-semibold"
                        : leave.status === "rejected"
                        ? "text-red-600 font-semibold"
                        : "text-blue-600 font-semibold"
                    }
                  >
                    {leave.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
