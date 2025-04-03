import React from 'react';
import { Store, SearchParams } from '../../types';

interface StoreFilterProps {
  stores: Store[];
  selectedStore: string;
  onStoreChange: (storeId: SearchParams['store']) => void;
}

export const StoreFilter: React.FC<StoreFilterProps> = ({ stores, selectedStore, onStoreChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Tiendas</h2>
      <div className="space-y-2">
        {stores.map(store => (
          <button
            key={store.id}
            onClick={() => onStoreChange(store.id as SearchParams['store'])}
            className={`w-full text-left px-3 py-2 rounded flex justify-between items-center hover:bg-gray-50 ${
              selectedStore === store.id ? 'bg-gray-100' : ''
            }`}
          >
            <span>{store.name}</span>
            <span className="text-gray-500 text-sm">({store.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};