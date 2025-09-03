import { API_URL } from '../utils/connection';

export interface Category {
  id: string;
  name: string;
  categoryType: {
    id: number;
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

export async function updateCategory(
  categoryId: string,
  data: { name: string; type: number }
) {
  const response = await fetch(`${API_URL}/categories/edit/${categoryId}`, {
    method: 'PATCH',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  console.log(data.name);
  return response.json;
}
