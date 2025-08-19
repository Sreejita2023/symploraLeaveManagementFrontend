"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("manager"); // default selected
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useDefault, setUseDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Effect to auto-fill when checkbox is checked
  useEffect(() => {
    if (useDefault) {
      if (role === "manager") {
        setEmail("manager@gmail.com");
        setPassword("12345678");
      } else {
        setEmail("employee@gmail.com");
        setPassword("12345678");
      }
    } else {
      setEmail("");
      setPassword("");
    }
  }, [useDefault, role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/${role}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Check your credentials ❌");
      }

      const data = await res.json();
      console.log("data", data);

      setSuccess(true);
      setTimeout(() => {
        if (role === "manager") {
          router.push("/manager");
        } else {
          router.push("/employee");
        }
      }, 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Login</h1>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            disabled={useDefault}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            disabled={useDefault}
          />
        </div>

        {/* Role Selection */}
        <div className="flex justify-around mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="manager"
              checked={role === "manager"}
              onChange={() => setRole("manager")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span>Manager</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="role"
              value="employee"
              checked={role === "employee"}
              onChange={() => setRole("employee")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span>Employee</span>
          </label>
        </div>

        {/* Default Credentials Checkbox */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            checked={useDefault}
            onChange={() => setUseDefault(!useDefault)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Use default credentials</span>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Success */}
        {success && (
          <p className="text-green-600 text-sm text-center">
            Login successful ✅
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
