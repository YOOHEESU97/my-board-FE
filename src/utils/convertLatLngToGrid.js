/**
 * convertLatLngToGrid: 위경도 좌표를 기상청 격자 좌표(X, Y)로 변환
 * - 기상청 단기예보 API는 위경도가 아닌 자체 격자 좌표계(Lambert Conformal 투영) 사용
 * - 이 함수는 GPS 좌표를 기상청 API에서 사용하는 격자 좌표로 변환
 * 
 * number lat - 위도 (latitude)
 * number lon - 경도 (longitude)
 * returns {{ x: number, y: number }} - 기상청 격자 좌표 (nx, ny)
 * 
 * 참고: 기상청 격자 좌표 변환 알고리즘
 * 출처: 기상청 단기예보 조회서비스 기술문서
 */
export function convertLatLngToGrid(lat, lon) {
  // Lambert Conformal Conic 투영법 상수 (기상청 기준)
  const RE = 6371.00877; // 지구 반경 (km)
  const GRID = 5.0; // 격자 간격 (km)
  const SLAT1 = 30.0; // 표준위도 1
  const SLAT2 = 60.0; // 표준위도 2
  const OLON = 126.0; // 기준점 경도 (degree)
  const OLAT = 38.0; // 기준점 위도 (degree)
  const XO = 43; // 기준점 X좌표 (격자)
  const YO = 136; // 기준점 Y좌표 (격자)

  const DEGRAD = Math.PI / 180.0; // degree to radian 변환 상수

  // 투영 계산용 변수
  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  // 투영 파라미터 계산
  const sn =
    Math.log(Math.cos(slat1) / Math.cos(slat2)) /
    Math.log(
      Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
        Math.tan(Math.PI * 0.25 + slat1 * 0.5)
    );
  const sf =
    (Math.pow(Math.tan(Math.PI * 0.25 + slat1 * 0.5), sn) * Math.cos(slat1)) /
    sn;
  const ro = (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + olat * 0.5), sn);

  // 입력 좌표의 투영 계산
  const ra =
    (re * sf) / Math.pow(Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5), sn);
  let theta = lon * DEGRAD - olon;
  
  // 각도 정규화 (-π ~ π)
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  // 격자 좌표 계산 (반올림)
  const x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { x, y };
}
