import { trackClick } from "../../API/history.api.js";

const VideoCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.url,
      type: "video",
    });
  };

  return (
    <div className="flex gap-4 py-4 border-b border-white/10 group">
      
      {/* Thumbnail */}
      <div className="relative flex-shrink-0">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-40 h-24 object-cover rounded-lg group-hover:brightness-110 transition"
        />

        {/* Duration */}
        {item.duration && (
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
            {item.duration}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        
        {/* URL */}
        <p className="text-xs text-slate-400 truncate">
          {item.source || "YouTube"}
        </p>

        {/* Title */}
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          onClick={handleClick}
          className="block text-white text-lg font-medium leading-snug hover:text-indigo-400 transition"
        >
          {item.title}
        </a>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-slate-300 mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Meta */}
        <p className="text-xs text-slate-500 mt-1">
          {item.channel} {item.publishedAt && `• ${item.publishedAt}`}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;