import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { getHistory } from "../api/history.api";
import useAuth from "../hooks/useAuth";

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data.history || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load search history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user, authLoading]);

  const handleSearchClick = (query, type) => {
    navigate(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="text-center mt-10">
          <p className="text-lg">Please login to view your search history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Search History</h1>

        {loading && (
          <div className="text-center mt-5">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="text-center mt-5">
            <p>No search history found.</p>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <button
                      onClick={() => handleSearchClick(item.query, item.type)}
                      className="text-primary text-lg font-semibold hover:underline text-left"
                    >
                      {item.query}
                    </button>
                    <div className="flex gap-2 mt-2">
                      <span className="badge badge-outline">{item.type}</span>
                      <span className="text-sm text-gray-500">
                        {item.totalResults} results
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                {item.clicks && item.clicks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-base-300">
                    <p className="text-sm text-gray-500 mb-2">
                      Clicked results:
                    </p>
                    <ul className="space-y-1">
                      {item.clicks.map((click, idx) => (
                        <li key={idx} className="text-sm">
                          <a
                            href={click.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:underline"
                          >
                            {click.title || click.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
