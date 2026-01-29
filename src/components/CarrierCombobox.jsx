import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import deliveryCompanies from "../constants/deliveryCompanies";

/**
 * CarrierCombobox: 택배사 선택 드롭다운 컴포넌트
 * - @headlessui/react의 Combobox 사용 (검색 가능한 드롭다운)
 * - 136개의 택배사 목록에서 검색 및 선택
 * - 실시간 필터링 지원 (한글 택배사명 검색)
 * 
 * @param {string} selected - 선택된 택배사 코드
 * @param {Function} setSelected - 선택 상태 업데이트 함수
 */
export default function CarrierCombobox({ selected, setSelected }) {
  // 검색어 상태
  const [query, setQuery] = useState("");

  // 검색어로 택배사 목록 필터링
  const filteredCompanies =
    query === ""
      ? deliveryCompanies // 검색어 없으면 전체 목록
      : deliveryCompanies.filter((company) =>
          company.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          {/* 입력 필드 (검색 + 선택된 값 표시) */}
          <ComboboxInput
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="택배사 검색"
            displayValue={(val) =>
              deliveryCompanies.find((c) => c.code === val)?.name || ""
            }
            onChange={(e) => setQuery(e.target.value)}
          />
          
          {/* 드롭다운 열기 버튼 */}
          <ComboboxButton className="absolute inset-y-0 right-2 flex items-center">
            <ChevronsUpDown className="w-4 h-4 text-gray-500" />
          </ComboboxButton>

          {/* 드롭다운 옵션 목록 */}
          {filteredCompanies.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border shadow-lg">
              {filteredCompanies.map((company) => (
                <ComboboxOption
                  key={company.code}
                  value={company.code}
                  className="p-2 cursor-pointer transition-colors data-[focus]:bg-blue-100"
                >
                  {({ selected }) => (
                    <div className="flex justify-between items-center">
                      <span>{company.name}</span>
                      {/* 선택된 항목에 체크 아이콘 표시 */}
                      {selected && <Check className="w-4 h-4 text-blue-500" />}
                    </div>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
    </div>
  );
}
