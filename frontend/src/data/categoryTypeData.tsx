import { API_URL } from '../utils/connection';

export interface CategoryType {
  id: string;
  name: string;
}

export async function getCategoryTypes(): Promise<CategoryType[]> {
  const response = await fetch(`${API_URL}/category-types`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const categories: CategoryType[] = await response.json();
  return categories;
}

export async function getOneCategoryType(
  categoryId: string
): Promise<CategoryType> {
  const response = await fetch(`${API_URL}/category-type/${categoryId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }
  const categories: CategoryType = await response.json();
  return categories;
}
