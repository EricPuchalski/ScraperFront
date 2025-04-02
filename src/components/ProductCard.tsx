import React from 'react';
import { Product } from '../types';
import { Flag, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const latestPrice = product.priceHistory[product.priceHistory.length - 1];
  const isARS = latestPrice.currency === 'ARS';

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden p-4">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-[#1a1a1a] transition-colors">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 border-t border-gray-100">
        <h3 className="text-sm font-medium line-clamp-2 mb-3 min-h-[2.5rem] group-hover:text-[#1a1a1a] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isARS ? (
              <span className="text-xl font-bold">$ {latestPrice.price.toLocaleString()}</span>
            ) : (
              <>
                <Flag className="w-5 h-5 text-[#1a1a1a]" />
                <span className="text-xl font-bold">Gs {latestPrice.price.toLocaleString()}</span>
              </>
            )}
          </div>
          <span className="text-sm text-gray-500">{product.page}</span>
        </div>
        <a 
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-center bg-[#1a1a1a] text-white py-2 rounded-md hover:bg-[#2a2a2a] transition-colors"
        >
          Ver Producto
        </a>
      </div>
    </div>
  );
}