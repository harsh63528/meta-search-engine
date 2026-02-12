import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import HistoryList from "../components/history/HistoryList";
import ClearHistoryModal from "../components/history/ClearHistoryModal";
import { getHistory, clearHistory } from "../API/history.api";
import useAuth from "../hooks/useAuth";

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data.history || []);
    } catch (err) {
      setError("Failed to load search history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchHistory();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
    document.getElementById("clear_modal").close();
  };

  if (!user && !authLoading) {
    return (
      <div className="min-h-screen bg-base-200">
        <Navbar />
        <div className="text-center mt-10">
          <p className="text-lg">
            Please login to view your search history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Search History</h1>

          {history.length > 0 && (
            <button
              className="btn btn-error btn-sm"
              onClick={() =>
                document.getElementById("clear_modal").showModal()
              }
            >
              Clear All
            </button>
          )}
        </div>

        {loading && (
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && history.length === 0 && (
          <div className="text-center">
            <p>No search history found.</p>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <HistoryList history={history} />
        )}
      </div>

      <ClearHistoryModal onConfirm={handleClearHistory} />
    </div>
  );
};

export default History;
