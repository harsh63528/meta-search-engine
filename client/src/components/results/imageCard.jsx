import { trackClick } from "../../api/history.api";

const ImageCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.imageUrl,
      type: "images",
    });
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="rounded-xl"
          onClick={handleClick}
        />
      </figure>
    </div>
  );
};

export default ImageCard;
