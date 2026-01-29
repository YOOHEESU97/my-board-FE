import { Inbox, Truck, CheckCircle } from "lucide-react";

/**
 * TrackDetail: 배송 상세 정보 컴포넌트
 * - 배송 현황 프로그레스 바 (3단계: 상품접수 → 이동중 → 배송완료)
 * - 배송 이력 타임라인 (최신 이력이 위에 표시)
 * - 배송지 주소 및 현재 상태 표시
 * 
 * Object data - 배송 조회 API 응답 데이터
 * Object data.lastStateDetail - 마지막 배송 상태
 * Array data.trackingDetails - 배송 이력 배열
 * string data.receiverAddr - 수취인 주소
 */
export default function TrackDetail({ data }) {
  const { lastStateDetail, trackingDetails, receiverAddr } = data;
  
  // 프로그레스 바 단계별 아이콘
  const stepIcons = [
    <Inbox size={18} key="inbox" />, // 상품접수
    <Truck size={18} key="truck" />, // 이동중
    <CheckCircle size={18} key="check" />, // 배송완료
  ];
  
  // 현재 배송 상태
  const currentStatus = lastStateDetail?.kind || "상태 없음";

  // 프로그레스 바 단계 레이블
  const progressSteps = ["상품접수", "이동중", "배송완료"];
  
  /**
   * 현재 배송 상태에 따른 프로그레스 인덱스 계산
   * - "완료" 포함 → 2 (배송완료)
   * - "배송" 또는 "출발" 포함 → 1 (이동중)
   * - 그 외 → 0 (상품접수)
   */
  const progressIndex = currentStatus.includes("완료")
    ? 2
    : currentStatus.includes("배송") || currentStatus.includes("출발")
    ? 1
    : 0;
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

      {/* 프로그레스 바 (3단계) */}
      <div className="flex items-center justify-between relative mb-10">
        {/* 배경 라인 (회색) */}
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 z-0"></div>

        {/* 각 단계 아이콘 */}
        {progressSteps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center w-1/3 z-10">
            {/* 원형 아이콘 */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-2 transition-colors ${
                idx <= progressIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              {stepIcons[idx]}
            </div>
            {/* 단계 레이블 */}
            <p className="text-sm text-center">{step}</p>
          </div>
        ))}
      </div>

      {/* 배송 이력 타임라인 */}
      <h3 className="text-lg font-semibold mb-4">📜 배송 이력</h3>
      <ul className="space-y-4">
        {/* 최신 이력이 먼저 표시되도록 reverse() */}
        {trackingDetails
          .slice()
          .reverse()
          .map((step, index) => (
            <li
              key={index}
              className={`relative bg-white border rounded-xl p-4 shadow-sm transition-all ${
                index === 0 ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {/* 최신 이력에 체크 아이콘 표시 */}
              {index === 0 && (
                <CheckCircle
                  className="absolute top-2 right-2 text-blue-500"
                  size={18}
                />
              )}
              
              {/* 배송 상태 */}
              <p
                className={
                  index === 0
                    ? "text-base text-gray-900 font-black"
                    : "text-base text-gray-900"
                }
              >
                {step.kind}
              </p>
              
              {/* 위치 정보 */}
              <p className="text-sm text-gray-700 font-medium">
                {step.where}
              </p>
              
              {/* 시간 정보 */}
              <p className="text-xs text-gray-500 font-medium">
                {step.timeString}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
