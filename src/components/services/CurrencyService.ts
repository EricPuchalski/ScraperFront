// src/services/currencyService.ts

// Tipo para las tasas de cambio
export interface ExchangeRates {
    [key: string]: number;
  }
  
  // Función para obtener las tasas de cambio actuales
  export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
    try {
      // Usando la API gratuita de ExchangeRate-API
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      
      if (!response.ok) {
        throw new Error('Error al obtener tasas de cambio');
      }
      
      const data = await response.json();
      
      // Las tasas vienen como 1 USD = X moneda
      // Necesitamos invertirlas para tener 1 Moneda = X USD
      const rates: ExchangeRates = {};
      
      Object.keys(data.rates).forEach(currency => {
        rates[currency] = 1 / data.rates[currency];
      });
      
      return rates;
    } catch (error) {
      console.error('Error al obtener tasas de cambio:', error);
      
      // Valores de respaldo en caso de error
      return {
        'ARS': 1 / 1100,
        'PYG': 1 / 7500,
        'USD': 1
      };
    }
  };
  
  // Función para convertir cualquier moneda a USD
  export const convertToUSD = async (amount: number, currency: string): Promise<number> => {
    try {
      // Obtener las tasas de cambio actuales
      const rates = await fetchExchangeRates();
      
      // Si tenemos la tasa para esta moneda, hacer la conversión
      if (rates[currency]) {
        return amount * rates[currency];
      }
      return 0;
      
    } catch (error) {
      console.error('Error en la conversión de moneda:', error);
      return 0;
    }
  };
  
  // Función para actualizar periódicamente las tasas de cambio
  let cachedRates: ExchangeRates | null = null;
  let lastFetchTime = 0;
  const CACHE_DURATION = 3600000; // 1 hora en milisegundos
  
  export const getCachedExchangeRates = async (): Promise<ExchangeRates> => {
    const now = Date.now();
    
    // Si no hay tasas en caché o han pasado más de CACHE_DURATION milisegundos desde la última actualización
    if (!cachedRates || now - lastFetchTime > CACHE_DURATION) {
      cachedRates = await fetchExchangeRates();
      lastFetchTime = now;
    }
    
    return cachedRates;
  };
  
  // Versión sincrónica para componentes que no pueden usar async/await
  export const convertToUSDSync = (amount: number, currency: string): number => {
    // Valores predeterminados en caso de que no se hayan cargado las tasas
    switch (currency) {
      case 'ARS':
        return amount / 1100;
      case 'PYG':
        return amount / 7500;
      default:
        return amount;
    }
  };