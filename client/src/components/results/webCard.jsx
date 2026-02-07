import { trackClick } from "../../api/history.api";

const WebCard = ({ item }) => {
  const handleClick = () => {
    trackClick({
      title: item.title,
      url: item.link,
      type: "web",
    });
  };

  return (
    <div className="card bg-base-100 shadow-md p-4 mb-4 hover:shadow-xl transition">
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        className="text-primary text-lg font-semibold"
      >
        {item.title}
      </a>

      <p className="text-sm text-gray-500">{item.link}</p>
      <p className="mt-2">{item.snippet}</p>
    </div>
  );
};

export default WebCard;
