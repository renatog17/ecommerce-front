import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>

        <p className="text-gray-700 mb-8">
          Choose an option below to continue.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/signup"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}