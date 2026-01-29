import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";
import { convertLatLngToGrid } from "../utils/convertLatLngToGrid";
import {
  groupForecastItems,
  getNextForecastItem,
} from "../utils/forecastUtils";

/**
 * useWeather: 현재 위치 기반 날씨 정보를 가져오는 커스텀 훅
 * 
 * weather, isLoading, error
 * - weather: 날씨 정보 객체
 * - isLoading: 로딩 중 여부
 * - error: 에러 객체 (에러 발생 시)
 */
export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 위치 권한이 없거나 거부된 경우 처리
    if (!navigator.geolocation) {
      setError(new Error("브라우저가 위치 정보를 지원하지 않습니다."));
      setIsLoading(false);
      return;
    }

    // 사용자 위치 권한 요청 및 날씨 정보 가져오기
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // 위경도를 기상청 격자 좌표로 변환
          const { x, y } = convertLatLngToGrid(latitude, longitude);

          // 기상청 API 호출
          const weatherItems = await fetchWeather({ x, y });

          // 날짜+시간별로 그룹화
          const grouped = groupForecastItems(weatherItems);

          // 현재 시각 이후 첫 번째 예보 추출
          const next = getNextForecastItem(grouped);
          setWeather(next);
          setError(null);
        } catch (err) {
          console.error("날씨 정보 불러오기 실패:", err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        console.error("위치 정보 가져오기 실패:", err);
        setError(err);
        setIsLoading(false);
      }
    );
  }, []);

  return { weather, isLoading, error };
}
