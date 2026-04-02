import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import SearchBar from "../components/search/searchbar.jsx";
import SearchTabs from "../components/search/searchTabs.jsx";
import WebCard from "../components/results/webCard.jsx";
import ImageCard from "../components/results/imageCard.jsx";
import VideoCard from "../components/results/VideoCard.jsx";
import ArticleCard from "../components/results/ArticleCard.jsx";
import useSearch from "../Hooks/useSearch.js";
import { searchQuery } from "../API/search.api.js";

const Results = () => {
  const [params] = useSearchParams();
  const q = params.get("q");

  const {
    setQuery,
    results,
    setResults,
    activeTab,
    loading,
    setLoading,
  } = useSearch();

  useEffect(() => {
    if (!q) return;

    const fetchData = async () => {
      setQuery(q);
      setLoading(true);

      try {
        const res = await searchQuery(q, activeTab);
        setResults(res.data.results || []);
      } catch (err) {
        console.log(err);
        setResults([]);
      }

      setLoading(false);

      // ✅ Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    fetchData();
  }, [q, activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Search */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Tabs */}
        <SearchTabs />

        {/* Result Count */}
        {!loading && results.length > 0 && (
          <p className="text-sm text-slate-400 mt-4">
            About {results.length} results for{" "}
            <span className="text-indigo-400 font-medium">"{q}"</span>
          </p>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-4 mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-white/5 animate-pulse border border-white/10"
              ></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-xl text-slate-400">
              No results found for
            </p>
            <p className="text-indigo-400 font-semibold mt-2">
              "{q}"
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="mt-6 space-y-5">
            {results.map((item, i) => {
              switch (item.type) {
                case "image":
                  return <ImageCard key={i} item={item} />;
                case "video":
                  return <VideoCard key={i} item={item} />;
                case "article":
                  return <ArticleCard key={i} item={item} />;
                default:
                  return <WebCard key={i} item={item} />;
              }
            })}
          </div>
        )}
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] top-20 left-10"></div>
        <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] bottom-10 right-10"></div>
      </div>

    </div>
  );
};

export default Results;