import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/AppContext";
import { fetchWeather } from "../api/weather";
import { convertLatLngToGrid } from "../utils/convertLatLngToGrid";
import {
  groupForecastItems,
  getNextForecastItem,
} from "../utils/forecastUtils";

/**
 * Home: 메인 홈 페이지 컴포넌트
 * - 사용자 정보 표시
 * - 현재 위치 기반 날씨 정보 (기상청 API)
 * - 빠른 이동 버튼 (게시판, 배송 조회)
 * - 최근 활동 내역 (현재는 하드코딩된 예시 데이터)
 * 
 * 기능:
 * 1. GPS로 현재 위치 가져오기
 * 2. 위경도 → 기상청 격자 좌표 변환
 * 3. 기상청 API로 날씨 정보 조회
 * 4. 현재 시각 이후 가장 가까운 예보 표시
 */
export default function Home() {
  const nav = useNavigate();
  const { user } = useUser();
  const [weather, setWeather] = useState(null);

  /**
   * 날씨 정보 로드
   * - 브라우저 Geolocation API로 현재 위치 가져오기
   * - 위경도를 기상청 격자 좌표로 변환
   * - 기상청 단기예보 API 호출
   * - 현재 시각 이후 가장 가까운 예보 추출
   */
  useEffect(() => {
    // 사용자 위치 권한 요청 및 날씨 정보 가져오기
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        
        // 위경도를 기상청 격자 좌표로 변환
        const { x, y } = convertLatLngToGrid(latitude, longitude);
        
        try {
          // 기상청 API 호출
          const weatherItems = await fetchWeather({ x, y });
          
          // 날짜+시간별로 그룹화
          const grouped = groupForecastItems(weatherItems);
          
          // 현재 시각 이후 첫 번째 예보 추출
          const next = getNextForecastItem(grouped);
          setWeather(next);
        } catch (err) {
          console.error("날씨 정보 불러오기 실패:", err);
        }
      },
      (error) => {
        console.error("위치 정보 가져오기 실패:", error);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10">
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
          
          {/* 날씨 정보 (로드되면 표시) */}
          {weather && (
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

        {/* 최근 활동 (임시 하드코딩 데이터) */}
        {/* TODO: 실제 데이터는 localStorage나 백엔드에서 가져와야 함 */}
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
