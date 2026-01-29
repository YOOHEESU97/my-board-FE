import axios from "axios";

/**
 * 배송 추적 관련 API 함수 (현재 미사용)
 * - 프론트엔드에서 직접 외부 API 호출하는 방식
 * - 실제로는 post.js의 getTrackingDelivery를 사용 (백엔드 경유)
 */

/**
 * fetchDeliveryInfo: 외부 배송 추적 API 직접 호출 (미사용)
 * - tracker.delivery API를 프론트에서 직접 호출
 * - CORS 문제로 현재는 백엔드를 거쳐 호출하는 방식 사용
 * @param {string} carrierCode - 택배사 코드
 * @param {string} invoiceNumber - 운송장 번호
 * @returns {Promise} 배송 추적 정보
 */
export const fetchDeliveryInfo = async (carrierCode, invoiceNumber) => {
  const url = `https://tracker.delivery/carriers/${carrierCode}/tracks/${invoiceNumber}`;
  const response = await axios.get(url);
  return response.data;
};
