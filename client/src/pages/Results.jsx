import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import SearchBar from "../components/search/SearchBar.jsx";
import SearchTabs from "../components/search/searchTabs.jsx";
import WebCard from "../components/results/WebCard.jsx";
import ImageCard from "../components/results/ImageCard.jsx";
import useSearch from "../hooks/useSearch.js";
import { searchQuery } from "../api/search.api.js";

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
        const res = await searchQuery(q);
        setResults(res.data);
      } catch (err) {
        console.log(err);
      }

      setLoading(false);
    };

    fetchData();
  }, [q]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-6">

        <SearchBar />
        <SearchTabs />

        {loading && (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* Web Results */}
        {activeTab === "web" &&
          results?.web?.map((item, i) => (
            <WebCard key={i} item={item} />
          ))}

        {/* Image Results */}
        {activeTab === "images" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {results?.images?.map((item, i) => (
              <ImageCard key={i} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};


export default Results;
