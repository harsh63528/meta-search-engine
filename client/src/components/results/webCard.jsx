import { trackClick } from "../../API/history.api.js";

const WebCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.link,
      type: "web",
    });
  };

  return (
    <div className="group p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300">
      
      {/* Top Row (favicon + link) */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <img
          src={`https://www.google.com/s2/favicons?domain=${item.link}`}
          alt=""
          className="w-4 h-4"
        />
        <span className="truncate">{item.link}</span>
      </div>

      {/* Title */}
      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className="block mt-1 text-lg font-semibold text-white hover:text-indigo-400 transition"
      >
        {item.title}
      </a>

      {/* Snippet */}
      {item.snippet && (
        <p className="mt-2 text-sm text-slate-300 line-clamp-3">
          {item.snippet}
        </p>
      )}
    </div>
  );
};

export default WebCard;