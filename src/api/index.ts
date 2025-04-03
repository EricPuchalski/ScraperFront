import { SearchParams, ProductsResponse } from '../types'; // Asegúrate de tener la ruta correcta
const BASE_URL = 'http://localhost:8080/api/v1/scraper';

// Función para obtener los productos desde el servidor
export const fetchProducts = async ({
  page,
  store = 'all',
  search = '',
  minPrice,
  maxPrice
}: SearchParams): Promise<ProductsResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.append('name', search || '');
  if (minPrice) searchParams.append('minPrice', minPrice.toString());
  if (maxPrice) searchParams.append('maxPrice', maxPrice.toString());
  searchParams.append('page', (page - 1).toString()); // Página cero-indexada
  searchParams.append('size', '21'); // Número de productos por página

  const url = `${BASE_URL}/${store}/search?${searchParams.toString()}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    // Aquí se obtiene el total de productos que coinciden con la búsqueda
    const total = data.totalElements;  // Este es el número total de productos que coinciden con la búsqueda
    const totalPages = data.totalPages; // Número total de páginas

    return {
      products: data.content,
      total,
      hasMore: page < totalPages // Si la página solicitada es menor que el total de páginas, hay más productos
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      products: [],
      total: 0,
      hasMore: false
    };
  }
};


// Función para obtener el número total de productos de un store
export const fetchStoreCount = async (store: string): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/${store}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    
    // Aquí asumimos que la respuesta es un objeto con el campo 'totalElements'
    return data.totalElements || 0; // Si no existe 'totalElements', retornamos 0
    
  } catch (error) {
    console.error(`Error fetching store count for ${store}:`, error);
    return 0;
  }
};
