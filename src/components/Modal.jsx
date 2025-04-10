import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ title, message, onClose, confirmLabel = "확인" }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          key="modal-content"
          initial={{ y: -20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center"
        >
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
          <p className="text-gray-700 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            {confirmLabel}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
