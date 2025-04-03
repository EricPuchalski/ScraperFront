import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SearchParams } from './types';
import { ITEMS_PER_PAGE } from './constants';
import { useProducts } from './hooks/useProducts';
import { useStores } from './hooks/useStores';
import { Layout } from './components/layout/Layout';
import { ProductGrid } from './components/product/ProductGrid';
import ProductDetails from './components/product_details/ProductDetails';

function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    store: 'all',
    search: '',
    minPrice: 0,
    maxPrice: 1000000
  });
  const [searchInput, setSearchInput] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

  const { products, loading, totalResults, hasMore } = useProducts(searchParams);
  const { stores } = useStores(searchParams);

  const handleSearch = () => {
    setSearchParams(prev => ({ ...prev, search: searchInput, page: 1 }));
  };

  const handlePriceChange = (value: number, type: 'min' | 'max') => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const applyPriceFilter = () => {
    setSearchParams(prev => ({
      ...prev,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      page: 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleStoreChange = (storeId: SearchParams['store']) => {
    setSearchParams(prev => ({
      ...prev,
      store: storeId,
      page: 1
    }));
  };

  const headerProps = {
    searchInput,
    setSearchInput,
    handleSearch
  };

  const sidebarProps = {
    searchInput,
    totalResults,
    priceRange,
    handlePriceChange,
    applyPriceFilter,
    stores,
    selectedStore: searchParams.store,
    onStoreChange: handleStoreChange
  };

  const searchResultsProps = {
    searchInput,
    totalResults
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/products"
          element={
            <Layout
              headerProps={headerProps}
              sidebarProps={sidebarProps}
              searchResultsProps={searchResultsProps}
              currentPage={searchParams.page} // Pass currentPage to Layout
            >
              <ProductGrid
                products={products}
                loading={loading}
                currentPage={searchParams.page}
                totalResults={totalResults}
                hasMore={hasMore}
                onPageChange={handlePageChange}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </Layout>
          }
        />
        <Route path="/product/:productId" element={<ProductDetails products={products} />} />
      </Routes>
    </Router>
  );
}

export default App;
