import { message } from 'antd';

// Base API URL - should match other services
const API_URL = 'https://localhost:7777/api';

// Product interfaces
export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  categoryName?: string;
  isActive: boolean;
  createdAt: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  imageUrl?: string;
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  imageUrl?: string;
}

export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: number;
  isActive?: boolean;
  imageUrl?: string;
}

export const productService = {
  // Get all products
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products');
      }

      return await response.json();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred while fetching products');
      throw error;
    }
  },

  // Get product by ID
  async getProductById(productId: number): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch product');
      }

      return await response.json();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred while fetching product details');
      throw error;
    }
  },

  // Create new product
  async createProduct(data: ProductCreateRequest): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      message.success('Product created successfully!');
      return await response.json();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred while creating product');
      throw error;
    }
  },

  // Update existing product
  async updateProduct(productId: number, data: ProductUpdateRequest): Promise<Product> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product');
      }

      message.success('Product updated successfully!');
      return await response.json();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred while updating product');
      throw error;
    }
  },

  // Delete product (or toggle active status)
  async toggleProductStatus(productId: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/products/${productId}/toggle-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update product status');
      }

      message.success('Product status updated successfully!');
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred while updating product status');
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      const response = await fetch(`${API_URL}/products/by-category/${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch products by category');
      }

      return await response.json();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'An error occurred while fetching products by category');
      throw error;
    }
  }
}; 