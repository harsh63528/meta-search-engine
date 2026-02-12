import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

const SearchBar = () => {
  const navigate = useNavigate();
  const { query, setQuery } = useSearch();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="join w-full">
        <input
          type="text"
          placeholder="Search anything..."
          className="input input-bordered join-item w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="btn btn-primary join-item"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
