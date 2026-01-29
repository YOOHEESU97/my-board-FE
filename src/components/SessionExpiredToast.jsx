/**
 * SessionExpiredToast: 세션 만료 토스트 콘텐츠 컴포넌트
 * - JWT 토큰 만료 시 표시되는 알림 내용
 * - 로그인 페이지로 이동하는 버튼 포함
 * - ToastManager의 showSessionExpiredToast에서 사용
 * 
 * @param {Function} closeToast - 토스트를 닫는 함수 (react-toastify에서 자동 주입)
 */
export default function SessionExpiredToast({ closeToast }) {
  /**
   * 로그인 페이지로 이동 처리
   * - 토스트 닫기
   * - 페이지 새로고침과 함께 로그인 페이지로 이동 (window.location 사용)
   */
  const handleLoginRedirect = () => {
    closeToast?.(); // 토스트 닫기 (옵셔널 체이닝)
    window.location.href = "/login"; // 강제 페이지 이동 (상태 초기화)
  };

  return (
    <div className="text-gray-800 text-center">
      <p className="font-semibold mb-2">세션이 만료되었습니다.</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors min-w-[180px] whitespace-nowrap"
        onClick={handleLoginRedirect}
      >
        로그인 페이지로 이동
      </button>
    </div>
  );
}
