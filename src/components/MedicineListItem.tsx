import React from "react";

export default function MedicineListItem({ medicine }: { medicine: Medicine }) {
  return (
    <div className="flex items-end justify-between py-2 px-4">
      <div className="flex items-end space-x-2">
        <h2 className="scroll-m-20  text-2xl font-medium tracking-tight transition-colors first:mt-0">
          {medicine.name}
        </h2>
        <h4 className="scroll-m-20 text-lg font-thin tracking-tight">
          {medicine.Company.name}
        </h4>
      </div>
      <div className="flex items-end">
        <h3 className="scroll-m-20 text-sm font-normal tracking-tight">
          {medicine.MedicineInShops[0].price}
        </h3>
      </div>
    </div>
  );
}
