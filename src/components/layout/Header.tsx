import React from 'react';
import { Store as StoreIcon, Heart, User } from 'lucide-react';
import { SearchBar } from '../search/SearchBar';

interface HeaderProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  handleSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchInput, setSearchInput, handleSearch }) => {
  return (
    <header className="bg-[#1a1a1a] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        {/* <div className="border-b border-gray-700">
          <div className="flex justify-end items-center px-4 py-2"> */}
            {/* <div className="flex items-center gap-2">
              <StoreIcon className="w-8 h-8 text-white" />
              <span className="text-xl font-bold">Tech Cruce</span>
            </div> */}
            {/* <div className="flex items-center gap-4">
              <button className="text-white hover:text-gray-300 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                <User className="w-6 h-6" />
                <span>Login</span>
              </button>
            </div> */}
          {/* </div>
        </div> */}
        {/* Search Bar */}
        <div className="px-4 py-3">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </header>
  );
};