const Modal = ({ title, message, onClose, confirmLabel = "확인" }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
};

export default Modal;
