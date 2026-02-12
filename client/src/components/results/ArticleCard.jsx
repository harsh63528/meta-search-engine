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
    <div className="card bg-base-100 shadow-md p-4 mb-4 hover:shadow-xl transition">
      <div className="flex gap-4">
        {item.image && (
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-32 h-20 object-cover rounded"
            />
          </div>
        )}
        <div className="flex-1">
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
            className="text-primary text-lg font-semibold hover:underline"
          >
            {item.title}
          </a>
          <div className="flex gap-2 mt-1 text-sm text-gray-500">
            {item.source && <span>{item.source}</span>}
            {item.source && item.publishedAt && <span>•</span>}
            {item.publishedAt && <span>{item.publishedAt}</span>}
          </div>
          {item.snippet && (
            <p className="mt-2 text-sm line-clamp-2">{item.snippet}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
