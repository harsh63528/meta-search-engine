import { useNavigate } from "react-router-dom";

const HistoryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate(`/search?q=${encodeURIComponent(item.query)}&type=${item.type}`);
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

  return (
    <div className="card bg-base-100 shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <button
            onClick={handleSearchClick}
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

      {item.clicks?.length > 0 && (
        <div className="mt-3 pt-3 border-t border-base-300">
          <p className="text-sm text-gray-500 mb-2">Clicked results:</p>
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
  );
};

export default HistoryCard;
