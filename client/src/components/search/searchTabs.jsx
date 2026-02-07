import useSearch from "../../hooks/useSearch";

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearch();

  const tabs = ["web", "images", "videos", "articles"];

  return (
    <div className="tabs tabs-boxed justify-center mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "tab-active" : ""}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;
