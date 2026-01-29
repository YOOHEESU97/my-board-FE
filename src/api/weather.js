import axios from "axios";

// 환경 변수에서 기상청 API 키 가져오기 (.env 파일 참조)
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

/**
 * fetchWeather: 기상청 단기예보 API 호출
 * - 공공데이터포털의 동네예보 조회 서비스 사용
 * - 현재 위치 기반 날씨 정보 조회 (3시간 단위 예보)
 * 
 * Object coords - 격자 좌표
 * number coords.x - 기상청 격자 X좌표 (nx)
 * number coords.y - 기상청 격자 Y좌표 (ny)
 * Promise<Array> 예보 항목 배열
 * 
 * 반환 데이터 구조:
 * - category: 자료 구분 (TMP=기온, SKY=하늘상태, POP=강수확률 등)
 * - fcstDate: 예보 날짜 (YYYYMMDD)
 * - fcstTime: 예보 시각 (HHmm)
 * - fcstValue: 예보 값
 */
export const fetchWeather = async ({ x, y }) => {
  const serviceKey = weatherKey;
  const today = new Date();
  
  // 오늘 날짜를 YYYYMMDD 형식으로 변환
  const baseDate = today.toISOString().slice(0, 10).replace(/-/g, "");
  
  /**
   * getBaseTime: 기상청 API 발표 시각 계산
   * - 공공데이터포털 하루 8번 예보 발표 (02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00)
   * returns string base_time (HHmm 형식)
   */
  const getBaseTime = () => {
    const now = new Date();
    const hour = now.getHours();

    // 기상청 예보 발표 시각 (시간 단위)
    const baseHours = [2, 5, 8, 11, 14, 17, 20, 23];
    
    // 현재 시각보다 이전의 가장 최근 발표 시각 찾기
    const last = baseHours.reduce((acc, cur) => (hour >= cur ? cur : acc), 2);
    return String(last).padStart(2, "0") + "00";
  };

  // 기상청 단기예보 API 엔드포인트
  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

  // API 요청 파라미터
  const params = {
    serviceKey, // 공공데이터포털에서 발급받은 인증키
    pageNo: "1", // 페이지 번호
    numOfRows: "1000", // 한 페이지 결과 수 (충분히 많이 설정)
    dataType: "JSON", // 응답 데이터 타입
    base_date: baseDate, // 발표 날짜
    base_time: getBaseTime(), // 발표 시각
    nx: x, // 예보지점 X 좌표
    ny: y, // 예보지점 Y 좌표
  };

  const { data } = await axios.get(url, { params });
  
  // API 응답에서 예보 항목 배열 추출
  return data.response.body.items.item;
};
