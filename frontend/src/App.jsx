import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
  to="/"
  className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
>
  {/* Optional icon */}
  <span className="h-6 w-6 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
    C
  </span>

  {/* Text */}
  <span className="text-xl md:text-2xl font-extrabold text-indigo-600 tracking-wide">
    Consulting Comrade
  </span>
</Link>

            <div className="flex space-x-6">
  <Link
    to="/"
    className="relative text-md font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-300"
  >
    Home
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </Link>

  <Link
    to="/admin"
    className="relative text-md font-medium text-slate-700 hover:text-indigo-600 transition-colors duration-300"
  >
    Admin
    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
  </Link>
</div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 text-center py-4 text-sm">
        &copy; {new Date().getFullYear()} Flipr Fullstack Task — Built with MERN & Tailwind
      </footer>
    </div>
  );
}