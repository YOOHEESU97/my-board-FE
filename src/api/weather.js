// src/api/weather.js
import axios from "axios";
const weatherKey = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async ({ x, y }) => {
  const serviceKey = weatherKey; // URL 인코딩 전 키
  const today = new Date();
  const baseDate = today.toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const getBaseTime = () => {
    const now = new Date();
    const hour = now.getHours();

    const baseHours = [2, 5, 8, 11, 14, 17, 20, 23];
    const last = baseHours.reduce((acc, cur) => (hour >= cur ? cur : acc), 2);
    return String(last).padStart(2, "0") + "00";
  };

  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";

  const params = {
    serviceKey,
    pageNo: "1",
    numOfRows: "1000",
    dataType: "JSON",
    base_date: baseDate,
    base_time: getBaseTime(),
    nx: x,
    ny: y,
  };

  const { data } = await axios.get(url, { params });
  return data.response.body.items.item;
};
