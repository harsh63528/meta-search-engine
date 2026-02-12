import { useContext } from "react";
import { SearchContext } from "../context/SearchContext.jsx";

const useSearch = () => {
  return useContext(SearchContext);
};

export default useSearch;
