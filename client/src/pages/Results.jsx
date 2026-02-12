import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import SearchBar from "../components/search/searchBar.jsx";
import SearchTabs from "../components/search/searchTabs.jsx";
import WebCard from "../components/results/webCard.jsx";
import ImageCard from "../components/results/imageCard.jsx";
import VideoCard from "../components/results/VideoCard.jsx";
import ArticleCard from "../components/results/ArticleCard.jsx";
import useSearch from "../hooks/useSearch.js";
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
    };

    fetchData();
  }, [q, activeTab]);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <SearchBar />
        <SearchTabs />

        {loading && (
          <div className="text-center mt-5">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {!loading && results.length === 0 && (
          <div className="text-center mt-5">
            <p>No results found</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="mt-5 space-y-4">
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
    </div>
  );
};

export default Results;
