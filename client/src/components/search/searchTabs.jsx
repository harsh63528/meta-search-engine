import useSearch from "../../Hooks/useSearch.js";

const SearchTabs = () => {
  const { activeTab, setActiveTab } = useSearch();

  const tabs = [
    { label: "WEB", value: "web" },
    { label: "IMAGES", value: "image" },
    { label: "VIDEOS", value: "video" },
    { label: "ARTICLES", value: "article" },
  ];

  return (
    <div className="flex justify-center mb-8">
      
      <div className="relative flex gap-2 bg-slate-900/70 backdrop-blur-xl border border-white/10 p-1 rounded-2xl shadow-lg">
        
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`relative px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }
              `}
            >
              {/* Active Background */}
              {isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl -z-10 shadow-md"></span>
              )}

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchTabs;