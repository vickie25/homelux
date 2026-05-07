import { useState, useEffect, useCallback } from 'react';
import { productsApi } from '../lib/api';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category_name: string;
  price: string;
  stock_quantity: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'DISCONTINUED';
  image_url?: string;
  description?: string;
  created_at: string;
}

export const useProducts = (filters: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await productsApi.list(filters);
      // Backend returns DRF paginated response
      setProducts(response.data.results || response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id: string) => {
    try {
      await productsApi.delete(id);
      await fetchProducts();
      return true;
    } catch (err) {
      console.error('Failed to delete product', err);
      return false;
    }
  };

  return { products, loading, error, refresh: fetchProducts, deleteProduct };
};
