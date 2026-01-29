import axiosInstance from "./axiosInstance";

/**
 * 배송 추적 관련 API 함수
 * - 백엔드 프록시를 통해 외부 배송 조회 API 호출
 */

/**
 * getTrackingDelivery: 배송 추적 정보 조회
 * - 백엔드를 거쳐 외부 배송 조회 API 호출
 * Object selectedCarrier - 택배사 및 운송장 정보
 * string selectedCarrier.carrier - 택배사 코드 (예: "04" = CJ대한통운)
 * string selectedCarrier.invoice - 운송장 번호
 * Promise 배송 추적 상세 정보
 */
export const getTrackingDelivery = (selectedCarrier) =>
  axiosInstance.post("/getTrackingDelivery", selectedCarrier);
