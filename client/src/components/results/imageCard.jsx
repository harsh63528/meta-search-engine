import { trackClick } from "../../API/history.api";

const ImageCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.url,
      type: "image",
    });

    window.open(item.url, "_blank"); // open image in new tab
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden group">
      <figure className="relative">
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          onClick={handleClick}
          className="w-full h-60 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-white text-sm font-semibold truncate">
            {item.title}
          </p>
        </div>
      </figure>
    </div>
  );
};

export default ImageCard;
