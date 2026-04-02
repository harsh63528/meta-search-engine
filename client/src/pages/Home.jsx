import Navbar from "../components/layout/Navbar.jsx";
import SearchBar from "../components/search/searchbar.jsx";
import useAuth from "../Hooks/useAuth.js";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Search Everything in One Place
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 max-w-xl mb-10">
          A powerful meta search engine that lets you explore results from multiple platforms instantly.
        </p>

        {/* Search Bar */}
        <SearchBar />

        {/* Auth Section */}
        <div className="mt-10">
          {user ? (
            <p className="text-lg text-slate-300">
              Welcome back, <span className="text-indigo-400 font-semibold">{user.name}</span> 👋
            </p>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <p className="text-slate-400">
                Login to start searching across platforms
              </p>

              <Link
                to="/login"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Optional Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] top-20 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] bottom-10 right-10"></div>
      </div>

    </div>
  );
}