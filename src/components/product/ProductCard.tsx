import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { Heart, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReactCountryFlag } from 'react-country-flag';
import { convertToUSDSync, getCachedExchangeRates, ExchangeRates } from '../services/CurrencyService';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const latestPrice = product.priceHistory[product.priceHistory.length - 1];
  const [usdPrice, setUsdPrice] = useState<number>(convertToUSDSync(latestPrice.price, latestPrice.currency));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Cargar las tasas de cambio y actualizar el precio
  useEffect(() => {
    const updateExchangeRate = async () => {
      setIsLoading(true);
      try {
        const rates: ExchangeRates = await getCachedExchangeRates();
        
        // Si tenemos la tasa para esta moneda, hacer la conversión
        if (rates[latestPrice.currency]) {
          setUsdPrice(latestPrice.price * rates[latestPrice.currency]);
        } else {
          // Usar la conversión de respaldo
          setUsdPrice(convertToUSDSync(latestPrice.price, latestPrice.currency));
        }
      } catch (error) {
        console.error('Error al actualizar tasa de cambio:', error);
        // Usar la conversión de respaldo
        setUsdPrice(convertToUSDSync(latestPrice.price, latestPrice.currency));
      } finally {
        setIsLoading(false);
      }
    };
    
    updateExchangeRate();
  }, [latestPrice.price, latestPrice.currency]);

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
      {/* Ribbon para ofertas (opcional)
      {product.discount && (
        <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold z-10">
          {product.discount}% OFF
        </div>
      )} */}
      
      <div className="relative aspect-square overflow-hidden p-3">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
        {/* <button
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all cursor-pointer"
          onClick={() => console.log('Agregar a favoritos')}
        >
         <Heart className="w-4 h-4" />  SOLAMENTE PARA CUANDO REALICE EL LOGIN Y PUEDA AGREGAR FAVORITOS
        </button> */}
      </div>
      
      <div className="p-3 border-t border-gray-100">
        <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-[#1a1a1a] transition-colors cursor-pointer">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {latestPrice.currency === 'ARS' && (
              <ReactCountryFlag countryCode="AR" svg className="w-4 h-4" />
            )}
            {latestPrice.currency === 'PYG' && (
              <ReactCountryFlag countryCode="PY" svg className="w-4 h-4" />
            )}
            <span className="text-lg font-bold">
              {latestPrice.currency === 'ARS' ? '$' : 'Gs'} {latestPrice.price.toLocaleString()}
            </span>
          </div>
          <span className="text-xs text-gray-500">{product.page}</span>
        </div>
        
        {/* Precio en USD */}
        <div className="flex items-center gap-1 mb-3 bg-blue-50 p-1 rounded">
          <ReactCountryFlag countryCode="US" svg className="w-4 h-4" />
          <DollarSign className="w-3 h-3 text-green-600" />
          {isLoading ? (
            <span className="text-sm text-gray-500">Calculando...</span>
          ) : (
            <span className="text-sm font-medium text-green-600">
              {usdPrice.toFixed(2)} USD
            </span>
          )}
        </div>
        
        <a
          href={product.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#1a1a1a] text-white py-2 rounded-md hover:bg-[#444] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
            <Link
  to={`/product/${product.id}`}
  className="block text-center bg-[#1a1a1a] text-white py-2 rounded-md hover:bg-[#444] hover:scale-105 transition-all duration-300 cursor-pointer"
>
  Ver Producto
</Link>
        </a>
      </div>
    </div>
  );
};