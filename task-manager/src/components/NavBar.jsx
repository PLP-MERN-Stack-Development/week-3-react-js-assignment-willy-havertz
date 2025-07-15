import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 p-4 shadow mb-4">
      <div className="flex justify-between max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Task Manager
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
