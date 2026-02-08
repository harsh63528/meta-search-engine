const ClearHistoryModal = ({ onConfirm }) => {
  return (
    <dialog id="clear_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Delete</h3>
        <p className="py-4">
          Are you sure you want to clear all history?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <button className="btn btn-error" onClick={onConfirm}>
            Yes, Clear
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ClearHistoryModal;
