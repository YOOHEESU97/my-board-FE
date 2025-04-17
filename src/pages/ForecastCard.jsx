export default function ForecastCard({ data }) {
  if (!data) return null;

  const formatTime = (time) => `${time.slice(0, 2)}시`;
  const skyDesc =
    {
      1: "☀️ 맑음",
      3: "⛅ 구름 많음",
      4: "☁️ 흐림",
    }[data.SKY] || "-";

  return (
    <div className="p-4 bg-blue-50 rounded-xl shadow text-sm w-full">
      <p className="text-base font-bold mb-2">
        📅 {data.fcstDate} {formatTime(data.fcstTime)} 기준 예보
      </p>
      <p>
        🌡️ 기온: <span className="font-medium">{data.TMP} °C</span>
      </p>
      <p>{skyDesc}</p>
      <p>🌧️ 강수확률: {data.POP} %</p>
      <p>💧 습도: {data.REH} %</p>
    </div>
  );
}
