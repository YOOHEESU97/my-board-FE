// 그룹화 함수: 기상청 예보 데이터를 날짜+시간 기준으로 묶고 정렬
export function groupForecastItems(items) {
  const grouped = {};

  items.forEach((item) => {
    const key = `${item.fcstDate}-${item.fcstTime}`;
    if (!grouped[key]) {
      grouped[key] = {
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
      };
    }
    grouped[key][item.category] = item.fcstValue;
  });

  // 날짜+시간 순 정렬된 배열 반환
  return Object.values(grouped).sort((a, b) => {
    const ak = a.fcstDate + a.fcstTime;
    const bk = b.fcstDate + b.fcstTime;
    return ak.localeCompare(bk);
  });
}

// 현재 시간 이후 가장 가까운 예보 하나 추출
export function getNextForecastItem(groupedItems) {
  const now = new Date();
  const nowKey = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}${String(now.getHours()).padStart(
    2,
    "0"
  )}00`;

  return groupedItems.find((entry) => {
    const key = entry.fcstDate + entry.fcstTime;
    return key >= nowKey;
  });
}
