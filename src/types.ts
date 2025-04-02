export interface PriceHistory {
  price: number;
  date: string;
  currency: string;
}

export interface Product {
  id: string;
  name: string;
  priceHistory: PriceHistory[];
  imageUrl: string;
  productUrl: string;
  page: string;
}

export interface SearchParams {
  page: number;
  store?: 'gezatek' | 'fullh4rd' | 'master-tech' | 'all';
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  hasMore: boolean;
}

export interface Store {
  name: string;
  id: string;
  count: number;
}