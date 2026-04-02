import { useNavigate } from "react-router-dom";
import useSearch from "../../Hooks/useSearch.js";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setQuery("");
  }, []);

  const handleSearch = () => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-0 max-w-2xl mx-auto">
      
      {/* Container */}
      <div className={`relative transition-all duration-300 ${isFocused ? "scale-[1.02]" : ""}`}>
        
        {/* Glow */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-2xl blur-xl opacity-0 transition duration-500 ${isFocused ? "opacity-40" : "group-hover:opacity-30"}`}></div>

        {/* Main */}
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Input Section */}
          <div className="flex items-center flex-1 px-4">
            
            {/* Icon */}
            <svg
              className={`w-5 h-5 mr-2 transition ${isFocused ? "text-indigo-400" : "text-slate-500"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Search anything..."
              className="flex-1 py-3 sm:py-4 bg-transparent outline-none text-white placeholder-slate-500 text-sm sm:text-base"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />

            {/* Clear */}
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="ml-2 text-slate-500 hover:text-white transition"
              >
                ✕
              </button>
            )}
          </div>

          {/* Button */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={!query.trim()}
            className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed transition text-sm sm:text-base"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;