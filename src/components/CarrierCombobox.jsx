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

export default function CarrierCombobox({ selected, setSelected }) {
  const [query, setQuery] = useState("");

  const filteredCompanies =
    query === ""
      ? deliveryCompanies
      : deliveryCompanies.filter((company) =>
          company.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <ComboboxInput
            className="w-full border p-2 rounded"
            placeholder="택배사 검색"
            displayValue={(val) =>
              deliveryCompanies.find((c) => c.code === val)?.name || ""
            }
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-2 flex items-center">
            <ChevronsUpDown className="w-4 h-4 text-gray-500" />
          </ComboboxButton>

          {filteredCompanies.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border shadow-lg">
              {filteredCompanies.map((company) => (
                <ComboboxOption
                  key={company.code}
                  value={company.code}
                  className={({ active }) =>
                    `p-2 cursor-pointer ${active ? "bg-blue-100" : "bg-white"}`
                  }
                >
                  {({ selected }) => (
                    <div className="flex justify-between items-center">
                      <span>{company.name}</span>
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
