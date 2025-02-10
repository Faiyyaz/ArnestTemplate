import {Product} from '../interfaces/Product';
import {ProductRepository} from '../repositories/ProductRepository';

const repository = new ProductRepository();

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    return await repository.fetchProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow error to be handled in the component
  }
};

export const fetchProduct = async (id: number): Promise<Product> => {
  try {
    return await repository.fetchProduct(id);
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error; // Rethrow error to be handled in the component
  }
};
