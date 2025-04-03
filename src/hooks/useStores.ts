import { useState, useEffect } from 'react';
import { Store, SearchParams } from '../types';
import { fetchProducts, fetchStoreCount } from '../api/index';
import { INITIAL_STORES } from '../constants';

export const useStores = (searchParams: SearchParams) => {
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);

  // Función para cargar el conteo total de productos (sin filtros)
  const loadStoreCounts = async () => {
    const updatedStores = [...stores];
    let totalCount = 0;

    for (const store of updatedStores) {
      if (store.id !== 'all') {
        const count = await fetchStoreCount(store.id);
        store.count = count;
        totalCount += count;
      }
    }

    updatedStores[0].count = totalCount;
    setStores(updatedStores);
  };

  // Función para actualizar los contadores con los filtros de búsqueda actuales
  const updateStoreCountsWithFilters = async () => {
    const updatedStores = [...stores];
    let totalFilteredCount = 0;

    // Obtener los parámetros de búsqueda actuales pero sin el filtro de tienda
    const commonParams = {
      page: 1,
      search: searchParams.search,
      minPrice: searchParams.minPrice,
      maxPrice: searchParams.maxPrice
    };

    for (const store of updatedStores) {
      if (store.id !== 'all') {
        const storeParams = { ...commonParams, store: store.id as SearchParams['store'] };
        const response = await fetchProducts(storeParams);
        
        store.count = response.total;
        totalFilteredCount += response.total;
      }
    }

    updatedStores[0].count = totalFilteredCount;
    setStores(updatedStores);
  };

  // Cargar conteos iniciales al montar el componente
  useEffect(() => {
    loadStoreCounts();
  }, []);

  // Actualizar los contadores si hay una búsqueda o filtros de precio
  useEffect(() => {
    if (searchParams.search || searchParams.minPrice > 0 || searchParams.maxPrice < 1000000) {
      updateStoreCountsWithFilters();
    }
  }, [searchParams.search, searchParams.minPrice, searchParams.maxPrice]);

  return { stores };
};