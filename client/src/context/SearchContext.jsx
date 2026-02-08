import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);   // ✅ must be array
  const [activeTab, setActiveTab] = useState("web");
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        setResults,
        activeTab,
        setActiveTab,
        loading,
        setLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
