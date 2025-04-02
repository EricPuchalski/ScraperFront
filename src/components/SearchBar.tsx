import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar productos..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#1a1a1a] focus:border-[#1a1a1a]"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#1a1a1a] text-white rounded-r-md hover:bg-[#2a2a2a] transition-colors flex items-center gap-2"
        >
          <Search className="w-5 h-5" />
          <span>Buscar</span>
        </button>
      </div>
    </form>
  );
}