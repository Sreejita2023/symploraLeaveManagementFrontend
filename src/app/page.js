import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[80px_1fr_40px] min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white shadow-md">
        <h1 className="text-2xl font-bold">Leave Management System</h1>
      </header>

      {/* Main Section */}
      <main className="flex flex-col lg:flex-row items-center justify-center px-8 py-12 gap-10">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 leading-snug">
            Manage Leaves <br /> Smarter & Faster 🚀
          </h2>
          <p className="text-gray-600 text-lg">
            Our Leave Management System makes it easy for{" "}
            <span className="font-semibold text-blue-600">managers</span> and{" "}
            <span className="font-semibold text-green-600">employees</span> to
            apply, track, and review leave requests effortlessly.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>✔ Apply & track your leaves online</li>
            <li>✔ Managers can review & approve requests</li>
            <li>✔ Easy dashboard for employees & managers</li>
          </ul>

          <div className="space-x-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700"
            >
              Sign Up (Manager Only)
            </Link>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="flex-1 flex justify-center">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
            alt="Leave Management Illustration"
            width={400}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex items-center justify-center bg-gray-200 text-gray-700 text-sm">
        © {new Date().getFullYear()} Leave Management System. All rights
        reserved.
      </footer>
    </div>
  );
}
