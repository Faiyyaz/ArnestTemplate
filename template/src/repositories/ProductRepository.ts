import {Product} from '../interfaces/Product';
import {PRODUCTS_API} from '../utils/apiEndpoints';
import axiosInstance from '../utils/axiosInstance';

export class ProductRepository {
  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await axiosInstance.get<Product[]>(PRODUCTS_API);
      return response.data;
    } catch (error) {
      console.error('Error fetching products from API:', error);
      throw error;
    }
  }

  async fetchProduct(id: number): Promise<Product> {
    try {
      const response = await axiosInstance.get<Product>(
        `${PRODUCTS_API}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching products from API:', error);
      throw error;
    }
  }
}
