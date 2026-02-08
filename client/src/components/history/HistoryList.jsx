import HistoryCard from "./HistoryCard";

const HistoryList = ({ history }) => {
  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default HistoryList;
