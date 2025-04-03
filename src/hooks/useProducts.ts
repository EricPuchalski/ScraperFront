import { useState, useEffect } from 'react';
import { Product, SearchParams } from '../types';
import { fetchProducts } from '../api/index';
import { ITEMS_PER_PAGE } from '../constants/index';

export const useProducts = (searchParams: SearchParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const response = await fetchProducts(searchParams);
    setProducts(response.products);
    setTotalResults(response.total);
    setHasMore(response.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [searchParams.page, searchParams.store, searchParams.search, searchParams.minPrice, searchParams.maxPrice]);

  return { products, loading, totalResults, hasMore };
};