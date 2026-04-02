import { trackClick } from "../../API/history.api.js";

const ImageCard = ({ item }) => {
  const handleClick = async (e) => {
    e.preventDefault();

    const imageUrl =
      item.url || item.link || item.image || item.thumbnail;

    if (!imageUrl) return; // prevent errors

    try {
      await trackClick({
        title: item.title,
        url: imageUrl,
        type: "image",
      });
    } catch (err) {
      console.error("Failed to track click:", err);
    }

    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  const imageSrc =
    item.thumbnail || item.image || item.url || item.link;

  return (
    <div className="group bg-slate-900/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-slate-900/60 hover:border-indigo-500/30 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10">
      
      <a
        href={item.url || item.link || item.image || "#"}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className="block"
      >
        <div className="aspect-video bg-slate-800 overflow-hidden">
          <img
            src={imageSrc}
            alt={item.title || "image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23334155' width='100' height='100'/%3E%3Ctext fill='%2394a3b8' font-size='14' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        <div className="p-4">
          <p className="text-slate-200 text-sm font-medium line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {item.title || "Untitled"}
          </p>

          {item.source && (
            <p className="text-slate-500 text-xs mt-2">
              {item.source}
            </p>
          )}
        </div>
      </a>
    </div>
  );
};

export default ImageCard;