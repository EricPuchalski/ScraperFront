import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Pagination } from '../ui/Pagination';

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  currentPage: number;
  totalResults: number;
  hasMore: boolean;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading,
  currentPage,
  totalResults,
  hasMore,
  onPageChange,
  itemsPerPage
}) => {
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className="flex-1">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1a1a1a] border-t-transparent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMore={hasMore}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};