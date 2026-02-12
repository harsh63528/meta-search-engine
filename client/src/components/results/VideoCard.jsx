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
    <div className="card bg-base-100 shadow-md p-4 mb-4 hover:shadow-xl transition">
      <div className="flex gap-4">
        {item.thumbnail && (
          <div className="flex-shrink-0">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-40 h-24 object-cover rounded"
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
          {item.channel && (
            <p className="text-sm text-gray-500 mt-1">{item.channel}</p>
          )}
          {item.duration && (
            <span className="badge badge-neutral mt-2">{item.duration}</span>
          )}
          {item.description && (
            <p className="mt-2 text-sm">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
