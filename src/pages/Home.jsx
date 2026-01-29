import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AppContext";
import { useWeather } from "../hooks/useWeather";

/**
 * Home: 메인 홈 페이지 컴포넌트
 * - 사용자 정보 표시
 * - 현재 위치 기반 날씨 정보 (useWeather 훅 사용)
 * - 빠른 이동 버튼 (게시판, 배송 조회)
 * - 최근 활동 내역 (현재는 하드코딩된 예시 데이터)
 */
export default function Home() {
  const nav = useNavigate();
  const { user } = useUser();
  const { weather, isLoading, error } = useWeather();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-xl p-6 space-y-6">
        {/* 헤더 */}
        <header className="flex justify-between items-center mb-2">
          <h1
            className="text-xl font-bold text-[#FF9C00] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => nav("/home")}
          >
            HOME
          </h1>
        </header>

        {/* 환영 메시지 + 현재 날씨 */}
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
          <span>{user?.nickname} 님, 환영합니다 👋</span>
          
          {/* 날씨 정보 조건부 렌더링 true면 로딩중*/}
          {isLoading && (
            <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
              ⏳ 날씨 로딩중...
            </span>
          )}
          
          {error && (
            <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
              ❌ 날씨 정보 불러오기 실패
            </span>
          )}
          
          {weather && !isLoading && !error && (
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
              {/* SKY: 하늘상태 (1=맑음, 3=구름많음, 4=흐림) */}
              {{
                1: "☀️ 맑음",
                3: "⛅ 구름 많음",
                4: "☁️ 흐림",
              }[weather.SKY] || "🌈"}{" "}
              {/* TMP: 기온 */}
              {weather.TMP}°C
            </span>
          )}
        </div>

        {/* 사용자 정보 카드 */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">👤 내 정보</h3>
          <p className="text-base font-bold mt-2">{user?.nickname}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </section>

        {/* 빠른 이동 버튼 그리드 */}
        <section className="grid grid-cols-2 gap-4">
          <button
            onClick={() => nav("/posts")}
            className="bg-blue-100 text-blue-700 font-semibold p-3 rounded shadow hover:bg-blue-200 transition-colors"
          >
            📄 게시판 가기
          </button>
          <button
            onClick={() => nav("/trackDelivery")}
            className="bg-green-100 text-green-700 font-semibold p-3 rounded shadow hover:bg-green-200 transition-colors"
          >
            📦 배송 조회
          </button>
        </section>

        {/* 최근 활동 (하드코딩 데이터) */}
        {/* 뭐 넣을지 고민중 */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">📌 최근 활동</h3>
          <p className="text-sm text-gray-500 mt-2">
            최근 글:{" "}
            <span className="font-medium text-gray-700">
              "배송조회 오류 해결방법"
            </span>
          </p>
          <p className="text-sm text-gray-500">
            최근 운송장:{" "}
            <span className="font-medium text-gray-700">588707245223</span>
          </p>
        </section>
      </div>
    </div>
  );
}
