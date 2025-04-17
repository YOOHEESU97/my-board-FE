import { useLocation, useNavigate } from "react-router-dom";
import TrackDetail from "./TrackDetail";

export default function TrackResult() {
  const location = useLocation();
  const nav = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="text-center mt-10">
        <p>❗ 조회된 정보가 없습니다.</p>
        <button
          className="mt-4 px-4 py-2 bg-gray-300 rounded"
          onClick={() => nav("/track")}
        >
          다시 조회하기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => nav(-1)}
          className="text-sm text-gray-500 hover:text-black mb-4 flex items-center"
        >
          <span className="mr-1 text-lg">←</span> 뒤로가기
        </button>

        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span>📦</span> 배송 조회 결과
        </h1>

        <TrackDetail data={data} />
      </div>
    </div>
  );
}
