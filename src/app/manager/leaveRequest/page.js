"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/managerNav";

export default function LeaveRequestPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leave requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("http://localhost:8000/leave/request", {
          method: "GET",
          credentials: "include", // send cookies if needed
        });
        const data = await res.json();
        if (!res.ok)
          throw new Error(data.message || "Failed to fetch requests");
        setRequests(data.data || []);
      } catch (err) {
        alert(`❌ Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle Accept/Reject
  const handleReview = async (leaveId, status) => {
    try {
      const res = await fetch(
        `http://localhost:8000/request/review/${status}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ leaveId }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Action failed");

      

      // Update local state so UI refreshes without reloading
      setRequests((prev) => prev.filter((req) => req._id !== leaveId));
      alert(`✅ Leave ${status} successfully!`);
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Leave Requests
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-600">No leave requests found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests?.map((req) => (
              <div
                key={req._id}
                className="bg-white p-6 rounded-2xl shadow-md space-y-3"
              >
                <h2 className="text-lg font-semibold text-gray-700">
                  {req.employeeId?.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Email: {req.employeeId?.email}
                </p>
                <p className="text-sm text-gray-600">
                  Department Leaves Left: {req.employeeId?.noOfLeaves}
                </p>
                <p className="text-sm text-gray-600">
                  From: {req.startDate} → To: {req.endDate}
                </p>
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={`${
                      req.status === "applied"
                        ? "text-yellow-600"
                        : req.status === "approved"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {/* Action Buttons */}
                {req.status === "applied" && (
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => handleReview(req._id, "approved")}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(req._id, "rejected")}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
