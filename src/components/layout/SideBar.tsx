import React, { useState } from 'react';
import { SearchParams, Store } from '../../types';
import { PriceRangeFilter } from '../filter/PriceRangeFilter';
import { StoreFilter } from '../filter/StoreFilter';

interface SidebarProps {
  searchInput: string;
  totalResults: number;
  priceRange: { min: number; max: number };
  handlePriceChange: (value: number, type: 'min' | 'max') => void;
  applyPriceFilter: () => void;
  stores: Store[];
  selectedStore: string;
  onStoreChange: (storeId: SearchParams['store']) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  searchInput,
  totalResults,
  priceRange,
  handlePriceChange,
  applyPriceFilter,
  stores,
  selectedStore,
  onStoreChange
}) => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      {/* Search Results - Always visible */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-xl font-semibold mb-2">{searchInput || ''}</h2>
        <p className="text-gray-600">{totalResults} productos</p>
      </div>

      {/* Filters Toggle Button - Only on mobile */}
      <button 
        className="w-full bg-blue-900 text-white font-medium py-2 px-4 rounded-lg mb-4 md:hidden"
        onClick={toggleFilters}
      >
        {filtersVisible ? 'Ocultar filtros' : 'Mostrar filtros'}
      </button>

      {/* Filters Container - Toggle visibility on mobile */}
      <div className={`space-y-6 ${filtersVisible ? 'block' : 'hidden'} md:block`}>
        {/* Price Range */}
        <PriceRangeFilter
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          applyPriceFilter={applyPriceFilter}
        />

        {/* Stores */}
        <StoreFilter
          stores={stores}
          selectedStore={selectedStore}
          onStoreChange={onStoreChange}
        />
      </div>
    </div>
  );
};