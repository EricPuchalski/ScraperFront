import React from 'react';

interface PriceRangeFilterProps {
  priceRange: { min: number; max: number };
  handlePriceChange: (value: number, type: 'min' | 'max') => void;
  applyPriceFilter: () => void;
}

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRange,
  handlePriceChange,
  applyPriceFilter
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Rango de precios</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <input
            type="number"
            value={priceRange.min}
            onChange={(e) => handlePriceChange(Number(e.target.value), 'min')}
            className="w-28 px-2 py-1 border border-gray-300 rounded text-sm"
            placeholder="Mínimo"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            value={priceRange.max}
            onChange={(e) => handlePriceChange(Number(e.target.value), 'max')}
            className="w-28 px-2 py-1 border border-gray-300 rounded text-sm"
            placeholder="Máximo"
          />
        </div>
        <button
          onClick={applyPriceFilter}
          className="w-full bg-[#1a1a1a] text-white py-2 rounded hover:bg-[#2a2a2a] transition-colors text-sm"
        >
          Aplicar rango de precios
        </button>
      </div>
    </div>
  );
};