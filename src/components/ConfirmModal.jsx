/**
 * ConfirmModal: 확인/취소 선택이 필요한 모달 컴포넌트
 * - 삭제와 같은 중요한 작업 전 사용자 확인용
 * - 취소/확인 두 개의 버튼 제공
 * - 사용처: 게시글 삭제 확인 등
 * 
 * @param {string} title - 모달 제목
 * @param {string} message - 확인 메시지
 * @param {string} confirmLabel - 확인 버튼 텍스트 (기본: "확인")
 * @param {string} cancelLabel - 취소 버튼 텍스트 (기본: "취소")
 * @param {Function} onConfirm - 확인 버튼 클릭 시 실행될 콜백
 * @param {Function} onCancel - 취소 버튼 클릭 시 실행될 콜백
 */
const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}) => {
  return (
    <div 
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={onCancel} // 배경 클릭 시 취소
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-80 text-center"
        onClick={(e) => e.stopPropagation()} // 모달 클릭 시 이벤트 전파 방지
      >
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        {/* 문법 오류 수정: text=gray-700 -> text-gray-700 */}
        <p className="text-gray-700 mb-4 whitespace-pre-wrap">{message}</p>
        <div className="flex justify-center gap-4">
          {/* 취소 버튼 */}
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {cancelLabel || "취소"}
          </button>
          {/* 확인 버튼 (주의가 필요한 작업이므로 빨간색) */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            {confirmLabel || "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
