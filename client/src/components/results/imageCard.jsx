import { trackClick } from "../../api/history.api";

const ImageCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.url,  
      type: "image",
    });
  };

  return (
    <div className="card bg-base-100 shadow-md">
      <figure>
        <img
          src={item.url}   
          alt={item.title}
          className="rounded-xl cursor-pointer"
          onClick={handleClick}
        />
      </figure>
    </div>
  );
};

export default ImageCard;
