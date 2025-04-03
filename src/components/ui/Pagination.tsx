import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasMore,
  onPageChange
}) => {
  // Function to handle page change and scroll to top
  const handlePageChange = (page: number) => {
    // Call the original onPageChange function
    onPageChange(page);
    
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling for a better user experience
    });
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded ${
            currentPage === i
              ? 'bg-[#1a1a1a] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } transition-colors shadow`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <span key="start-ellipsis" className="px-2">
          ...
        </span>
      );
      pages.unshift(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow"
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      pages.push(
        <span key="end-ellipsis" className="px-2">
          ...
        </span>
      );
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors shadow"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {renderPaginationNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || !hasMore}
        className="w-10 h-10 flex items-center justify-center rounded bg-white text-gray-700 disabled:opacity-50 hover:bg-gray-50 transition-colors shadow"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};