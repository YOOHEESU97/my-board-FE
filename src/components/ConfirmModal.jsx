const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text=gray-700 mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
          >
            {cancelLabel || "취소"}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            {confirmLabel || "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
