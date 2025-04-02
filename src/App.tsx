import React, { useState, useEffect } from 'react';
import { Product, SearchParams, Store } from './types';
import { fetchProducts, fetchStoreCount } from './api';
import { ProductCard } from './components/ProductCard';
import { SearchBar } from './components/SearchBar';
import { Store as StoreIcon, Heart, User, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from './components/Footer';

const ITEMS_PER_PAGE = 21;
const INITIAL_STORES = [
  { name: 'Todas las tiendas', id: 'all', count: 0 },
  { name: 'Gezatek', id: 'gezatek', count: 0 },
  { name: 'FullH4rd', id: 'fullh4rd', count: 0 },
  { name: 'MasterTech', id: 'master-tech', count: 0 }
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    store: 'all',
    search: '',
    minPrice: 0,
    maxPrice: 1000000
  });
  const [searchInput, setSearchInput] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });

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

  // Nueva función para actualizar los contadores con los filtros de búsqueda actuales
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

    // Para cada tienda, obtén el número de productos que coinciden con la búsqueda
    for (const store of updatedStores) {
      if (store.id !== 'all') {
        // Consulta específica para esta tienda con los filtros actuales
        const storeParams = { ...commonParams, store: store.id };
        const response = await fetchProducts(storeParams);
        
        // Actualiza el contador para esta tienda
        store.count = response.total;
        totalFilteredCount += response.total;
      }
    }

    // Actualiza el contador para "Todas las tiendas"
    updatedStores[0].count = totalFilteredCount;
    
    // Actualiza el estado con los nuevos contadores
    setStores(updatedStores);
  };

  const loadProducts = async () => {
    setLoading(true);
    const response = await fetchProducts(searchParams);
    setProducts(response.products);
    setTotalResults(response.total);
    setHasMore(response.hasMore);
    setLoading(false);
  };

  // Cargar conteos iniciales al montar el componente
  useEffect(() => {
    loadStoreCounts();
  }, []);

  // Cargar productos cuando cambian los parámetros de búsqueda
  useEffect(() => {
    loadProducts();
    
    // Actualizar los contadores de tiendas con los filtros actuales
    // Solo si hay una búsqueda o filtros de precio
    if (searchParams.search || searchParams.minPrice > 0 || searchParams.maxPrice < 1000000) {
      updateStoreCountsWithFilters();
    }
  }, [searchParams.store, searchParams.search, searchParams.minPrice, searchParams.maxPrice]);

  // No actualizar en cambios de página, solo con cambios de filtros
  useEffect(() => {
    loadProducts();
  }, [searchParams.page]);

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

  const totalPages = Math.ceil(totalResults / ITEMS_PER_PAGE);
  const currentPage = searchParams.page;

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
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="bg-[#1a1a1a] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          {/* Top Bar */}
          <div className="border-b border-gray-700">
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex items-center gap-2">
                <StoreIcon className="w-8 h-8 text-white" />
                <span className="text-xl font-bold">Tech Cruce</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-white hover:text-gray-300 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                  <User className="w-6 h-6" />
                  <span>Login</span>
                </button>
              </div>
            </div>
          </div>
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

      {/* Results Header */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold">RESULTADOS DE BÚSQUEDA</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0 space-y-6">
            {/* Search Results */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{searchInput || ''}</h2>
              <p className="text-gray-600">{totalResults} productos</p>
            </div>

            {/* Price Range */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Rango de precios</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(Number(e.target.value), 'min')}
                    className="w-28 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Mínimo"
                  />
                  <span className="text-gray-400">-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(Number(e.target.value), 'max')}
                    className="w-28 px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Máximo"
                  />
                </div>
                <button
                  onClick={applyPriceFilter}
                  className="w-full bg-[#1a1a1a] text-white py-2 rounded hover:bg-[#2a2a2a] transition-colors text-sm"
                >
                  Aplicar rango de precios
                </button>
              </div>
            </div>

            {/* Stores */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Tiendas</h2>
              <div className="space-y-2">
                {stores.map(store => (
                  <button
                    key={store.id}
                    onClick={() => setSearchParams(prev => ({
                      ...prev,
                      store: store.id as SearchParams['store'],
                      page: 1
                    }))}
                    className={`w-full text-left px-3 py-2 rounded flex justify-between items-center hover:bg-gray-50 ${
                      searchParams.store === store.id ? 'bg-gray-100' : ''
                    }`}
                  >
                    <span>{store.name}</span>
                    <span className="text-gray-500 text-sm">({store.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1a1a1a] border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && products.length > 0 && (
              <div className="mt-8 flex justify-center items-center gap-2">
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
            )}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;