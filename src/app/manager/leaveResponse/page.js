"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/managerNav";

export default function LeaveResponsePage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviewed leaves
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leave/review`, {
          method: "GET",
          credentials: "include", // if backend uses cookies
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch responses");
        setResponses(data.data || []);
      } catch (err) {
        alert(`❌ Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Leave Responses
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : responses.length === 0 ? (
          <p className="text-gray-600">No reviewed leave requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {responses.map((res) => (
              <div
                key={res._id}
                className="bg-white p-6 rounded-2xl shadow-md space-y-3"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {res.employeeId?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Email: {res.employeeId?.email}
                </p>
                <p className="text-sm text-gray-600">
                  Remaining Leaves: {res.employeeId?.noOfLeaves}
                </p>
                <p className="text-sm text-gray-600">
                  From: {res.startDate} → To: {res.endDate}
                </p>
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={`${
                      res.status === "approved"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }`}
                  >
                    {res.status}
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
