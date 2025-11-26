import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AppContext";
import { fetchWeather } from "../api/weather";
import { useEffect, useState } from "react";
import { convertLatLngToGrid } from "../utils/convertLatLngToGrid";
import {
  groupForecastItems,
  getNextForecastItem,
} from "../utils/forecastUtils";

export default function Home() {
  const nav = useNavigate();
  const { user } = useUser();
  const [weather, setWeather] = useState(null);
  console.log(user);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      const { x, y } = convertLatLngToGrid(latitude, longitude);
      try {
        const weatherItems = await fetchWeather({ x, y });
        console.log(weatherItems);
        const grouped = groupForecastItems(weatherItems);
        const next = getNextForecastItem(grouped);
        setWeather(next);
      } catch (err) {
        console.error("날씨 정보 불러오기 실패", err);
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-6 pb-10">
      <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-xl p-6 space-y-6">
        {/* 로고 / 제목 */}
        <header className="flex justify-between items-center mb-2">
          <h1
            className="text-xl font-bold text-[#FF9C00] cursor-pointer"
            onClick={() => nav("/home")}
          >
            HOME
          </h1>
        </header>

        {/* 환영 메시지 */}
        <div className="flex justify-between items-center text-lg font-semibold text-gray-800">
          <span>{user?.nickname} 님, 환영합니다 👋</span>
          {weather && (
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
              {{
                1: "☀️ 맑음",
                3: "⛅ 구름 많음",
                4: "☁️ 흐림",
              }[weather.SKY] || "🌈"}{" "}
              {weather.TMP}°C
            </span>
          )}
        </div>

        {/* 유저 정보 */}
        <section className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold text-gray-600">👤 내 정보</h3>
          <p className="text-base font-bold mt-2">{user?.nickname}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </section>

        {/* 빠른 이동 버튼 */}
        <section className="grid grid-cols-2 gap-4">
          <button
            onClick={() => nav("/posts")}
            className="bg-blue-100 text-blue-700 font-semibold p-3 rounded shadow hover:bg-blue-200"
          >
            📄 게시판 가기
          </button>
          <button
            onClick={() => nav("/trackDelivery")}
            className="bg-green-100 text-green-700 font-semibold p-3 rounded shadow hover:bg-green-200"
          >
            📦 배송 조회
          </button>
        </section>

        {/* 최근 활동 (임시 데이터 예시) */}
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
