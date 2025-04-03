import React from 'react';

interface SearchResultsProps {
  searchInput: string;
  totalResults: number;
}

export const SearchResults: React.FC<SearchResultsProps> = ({  }) => {
  return (
    <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] text-white py-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold">RESULTADOS DE BÚSQUEDA</h1>
      </div>
    </div>
  );
};