import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getTrackingDelivery } from "../api/delivery";
import CarrierCombobox from "../components/CarrierCombobox";
import Modal from "../components/Modal";

/**
 * TrackDelivery: 배송 조회 페이지
 * - 택배사 선택 (CarrierCombobox)
 * - 운송장 번호 입력
 * - 조회 버튼 클릭 시 배송 정보 API 호출
 * - 성공 시 결과 페이지로 이동 (state로 데이터 전달)
 * - 실패 시 에러 모달 표시
 */
export default function TrackDelivery() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const nav = useNavigate();

  /**
   * handleSubmit: 배송 조회 처리
   * - 택배사 코드와 운송장 번호로 배송 정보 조회
   * - 성공 시 결과 페이지로 이동 (React Router state 사용)
   * - 실패 시 에러 모달 표시
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!selectedCarrier) {
      alert("택배사를 선택해주세요.");
      return;
    }
    
    if (!invoiceNumber.trim()) {
      alert("운송장 번호를 입력해주세요.");
      return;
    }

    if (isSubmitting) return; // 중복 제출 방지

    try {
      setIsSubmitting(true);
      
      // 배송 조회 API 호출
      const res = await getTrackingDelivery({
        carrier: selectedCarrier,
        invoice: invoiceNumber,
      });

      // 결과 페이지로 이동 (state로 데이터 전달)
      nav("/trackDelivery/result", {
        state: res.data,
      });
    } catch (err) {
      console.error("배송 조회 실패:", err);
      setShowModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => nav(-1)}
        className="text-sm text-gray-500 hover:text-black mb-4 flex items-center transition-colors"
      >
        <span className="mr-1 text-lg">←</span> 뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-6">📦 배송 조회</h1>

      {/* 택배사 선택 드롭다운 */}
      <CarrierCombobox
        selected={selectedCarrier}
        setSelected={setSelectedCarrier}
      />

      {/* 운송장 번호 입력 폼 */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="운송장 번호를 입력하세요 (숫자만)"
          className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          pattern="[0-9]*"
          title="숫자만 입력 가능합니다"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "조회 중..." : "조회하기"}
        </button>
      </form>
      
      {/* 조회 실패 모달 */}
      {showModal && (
        <Modal
          title="❌ 조회 실패"
          message="배송 조회 중 오류가 발생했습니다.\n운송장 번호와 택배사를 확인해주세요."
          confirmLabel="확인"
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
