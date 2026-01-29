import { useNavigate } from "react-router-dom";

/**
 * FloatingButton: 플로팅 액션 버튼 (FAB)
 * - 화면 우하단에 고정된 글쓰기 버튼
 * - 클릭 시 게시글 작성 페이지로 이동
 * - Footer 위에 배치 (bottom-20 = Footer 높이 + 여유)
 */
export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/posts/write")}
      className="fixed bottom-20 right-4 bg-green-500 text-white text-2xl rounded-full w-14 h-14 shadow-lg hover:bg-green-600 transition-colors z-40"
      aria-label="글쓰기"
    >
      +
    </button>
  );
}
