import { API_URL } from '../utils/connection';

export interface Category {
  id: string;
  name: string;
  category: {
    name: string;
  };
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categories: Category[] = await response.json();
  return categories;
}

export async function getOneCategory(categoryId: string): Promise<Category> {
  const response = await fetch(`${API_URL}/categories/${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }
  const categories: Category = await response.json();
  return categories;
}
