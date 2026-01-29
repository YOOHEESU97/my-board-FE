/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
/* eslint-enable no-unused-vars */
/* 위에 주석 없으면 에러가 나진않지만 오류 메시지 나옴 */ 

/**
 * Modal: 알림 모달 컴포넌트
 * - 단순 알림용 (확인 버튼만 있음)
 * - 회원가입 완료, 게시글 작성 완료, 에러 메시지
 * 
 * string title - 모달 제목
 * string message - 모달 메시지 (필수!)
 * Function onClose - 확인 버튼 클릭 시 실행될 콜백
 * string confirmLabel - 확인 버튼 텍스트 (디폴트: "확인")
 */
const Modal = ({ title, message, onClose, confirmLabel = "확인" }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose} // 배경 클릭 시 닫기
      >
        {/* 모달 콘텐츠 */}
        <motion.div
          key="modal-content"
          initial={{ y: -20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center"
          onClick={(e) => e.stopPropagation()} // 모달 클릭 시 이벤트 전파 방지
        >
          {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{message}</p>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            {confirmLabel}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
