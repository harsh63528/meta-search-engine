import { trackClick } from "../../API/history.api.js";

const ArticleCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.url,
      type: "article",
    });
  };

  return (
    <div className="group flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-lg">
      
      {/* Image */}
      {item.image && (
        <div className="flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={item.image}
            alt={item.title}
            className="w-32 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1">
        
        {/* Title */}
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className="text-white text-lg font-semibold leading-snug hover:text-indigo-400 transition"
        >
          {item.title}
        </a>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
          {item.source && <span>{item.source}</span>}
          {item.source && item.publishedAt && <span>•</span>}
          {item.publishedAt && <span>{item.publishedAt}</span>}
        </div>

        {/* Snippet */}
        {item.snippet && (
          <p className="mt-2 text-sm text-slate-300 line-clamp-2">
            {item.snippet}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;