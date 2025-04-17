import { Inbox, Truck, CheckCircle } from "lucide-react";

export default function TrackDetail({ data }) {
  const { lastStateDetail, trackingDetails, receiverAddr } = data;
  {
    /* 아이콘 */
  }
  const stepIcons = [
    <Inbox size={18} />,
    <Truck size={18} />,
    <CheckCircle size={18} />,
  ];
  const currentStatus = lastStateDetail?.kind || "상태 없음";

  const progressSteps = ["상품접수", "이동중", "배송완료"];
  const progressIndex = currentStatus.includes("완료")
    ? 2
    : currentStatus.includes("배송") || currentStatus.includes("출발")
    ? 1
    : 0;
  console.log(data);
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* 배송 상태 헤더 */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-1">📍 배송지</p>
        <p className="font-bold text-gray-800">{receiverAddr}</p>
        <p className="text-sm mt-1">
          현재 상태:{" "}
          <span className="text-blue-600 font-semibold">{currentStatus}</span>
        </p>
        <p className="text-xs text-gray-400">
          마지막 업데이트: {lastStateDetail?.timeString}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center justify-between relative mb-10">
        {/* 라인 전체 */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 z-0"></div>

        {progressSteps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center w-1/3 z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                idx <= progressIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {stepIcons[idx]}
            </div>
            <p className="text-sm text-center">{step}</p>
          </div>
        ))}
      </div>

      {/* 배송 이력 리스트 */}
      <h3 className="text-lg font-semibold mb-4">📜 배송 이력</h3>
      <ul className="space-y-4">
        {trackingDetails
          .slice()
          .reverse()
          .map((step, index) => (
            <li
              key={index}
              className={`relative bg-white border rounded-xl p-4 shadow-sm ${
                index === 0 ? "border-blue-500" : ""
              }`}
            >
              {/* 체크 아이콘 (오른쪽 상단 표시) */}
              {index === 0 && (
                <CheckCircle
                  className="absolute top-2 right-2 text-blue-500"
                  size={18}
                />
              )}
              {/* 상태 텍스트 */}
              <p
                className={
                  index === 0
                    ? "text-base text-gray-900 font-black dark:text-white"
                    : "text-base text-gray-900"
                }
              >
                {step.kind}
              </p>
              <p className="text-sm text-gray-900 font-medium dark:text-white">
                {step.where}
              </p>
              <p className="text-xs text-gray-900 font-medium dark:text-white">
                {step.timeString}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
