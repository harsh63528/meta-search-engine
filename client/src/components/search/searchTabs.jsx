import useSearch from "../../hooks/usesearch";

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearch();

  const tabs = [
    { label: "WEB", value: "web" },
    { label: "IMAGES", value: "image" },
    { label: "VIDEOS", value: "video" },
    { label: "ARTICLES", value: "article" },
  ];

  return (
    <div className="tabs tabs-boxed justify-center mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SearchTabs;
