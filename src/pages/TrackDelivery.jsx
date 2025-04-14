import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrackingDelivery } from "../api/post";
import CarrierCombobox from "../components/CarrierCombobox"; // 경로에 맞게

export default function TrackDelivery() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invoiceNumber.trim()) return;

    try {
      const res = await getTrackingDelivery({
        carrier: selectedCarrier,
        invoice: invoiceNumber,
      });
      console.log("조회 성공", res);
    } catch (err) {
      console.log("조회 실패", err);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => nav(-1)}
        className="text-sm text-gray-500 hover:text-black mb-4 flex items-center"
      >
        <span className="mr-1 text-lg">←</span> 뒤로가기
      </button>

      <h1 className="text-2xl font-bold mb-6">📦 배송 조회</h1>

      <CarrierCombobox
        selected={selectedCarrier}
        setSelected={setSelectedCarrier}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="운송장 번호를 입력하세요"
          className="border p-3 rounded"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          조회하기
        </button>
      </form>
    </div>
  );
}
