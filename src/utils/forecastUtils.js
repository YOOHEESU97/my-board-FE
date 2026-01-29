/**
 * groupForecastItems: 기상청 예보 API 응답 데이터를 가공하는 함수
 * - 기상청 API는 각 예보 항목(기온, 하늘상태, 강수확률 등)을 개별 객체로 반환
 * - 이 함수는 같은 날짜+시간의 예보 항목들을 하나의 객체로 그룹화
 * 
 * Array items - 기상청 API 응답 배열 (각 항목: { fcstDate, fcstTime, category, fcstValue })
 * returns Array 날짜+시간별로 그룹화되고 시간순 정렬된 예보 배열

 */
export function groupForecastItems(items) {
  const grouped = {};

  items.forEach((item) => {
    // 날짜+시간을 키로 사용하여 그룹화
    const key = `${item.fcstDate}-${item.fcstTime}`;
    
    // 해당 시간대 객체가 없으면 초기화
    if (!grouped[key]) {
      grouped[key] = {
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
      };
    }
    
    // 예보 항목(category)을 속성으로 추가
    grouped[key][item.category] = item.fcstValue;
  });

  // 날짜+시간 순으로 정렬하여 배열로 반환
  return Object.values(grouped).sort((a, b) => {
    const ak = a.fcstDate + a.fcstTime;
    const bk = b.fcstDate + b.fcstTime;
    return ak.localeCompare(bk);
  });
}

/**
 * getNextForecastItem: 현재 시간 이후 가장 가까운 예보 데이터 추출
 * - 그룹화된 예보 배열에서 현재 시간 이후의 첫 번째 예보를 반환
 * - Home 화면에서 "지금 날씨" 표시에 사용
 * 
 * Array groupedItems - groupForecastItems 함수로 그룹화된 예보 배열
 * returns Object 현재 시간 이후 첫 번째 예보 객체
 */
export function getNextForecastItem(groupedItems) {
  const now = new Date();
  // 현재 시간을 기상청 API 형식으로 변환 (YYYYMMDDHHmm)
  const nowKey = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(
    2,
    "0"
  )}00`;

  // 현재 시간 이후의 첫 번째 예보 반환
  return groupedItems.find((entry) => {
    const key = entry.fcstDate + entry.fcstTime;
    return key >= nowKey;
  });
}
