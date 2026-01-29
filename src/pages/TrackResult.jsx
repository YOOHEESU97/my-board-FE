import { useLocation, useNavigate } from "react-router-dom";

import TrackDetail from "./TrackDetail";

/**
 * TrackResult: 배송 조회 결과 페이지
 * - TrackDelivery 페이지에서 React Router의 state로 전달받은 배송 정보 표시
 * - TrackDetail 컴포넌트로 상세 정보 렌더링
 * - state가 없으면 (직접 URL 접근 시) 에러 메시지 표시
 */
export default function TrackResult() {
  const location = useLocation();
  const nav = useNavigate();
  const data = location.state; // TrackDelivery에서 전달된 배송 정보

  // state가 없는 경우 (직접 URL 접근 시)
  if (!data) {
    return (
      <div className="text-center mt-10 px-4">
        <p className="text-lg mb-4">❗ 조회된 정보가 없습니다.</p>
        <p className="text-sm text-gray-600 mb-6">
          배송 조회 페이지에서 먼저 조회를 진행해주세요.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => nav("/trackDelivery")}
        >
          배송 조회하기
        </button>
      </div>
    );
  }

  // 정상적으로 데이터가 있는 경우
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={() => nav(-1)}
          className="text-sm text-gray-500 hover:text-black mb-4 flex items-center transition-colors"
        >
          <span className="mr-1 text-lg">←</span> 뒤로가기
        </button>

        {/* 페이지 제목 */}
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📦</span> 배송 조회 결과
        </h1>

        {/* 배송 상세 정보 컴포넌트 */}
        <TrackDetail data={data} />
      </div>
    </div>
  );
}
