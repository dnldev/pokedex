export const PRODUCTS_LOCAL_STORAGE_KEY = 'products';

export class Product {
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Clothes' | 'Blankets';
  imageUrl: string;
  phoneNumber: number;
  select: 'Mobile' | 'Landline';
}

export function getLocalStorageProducts(): Product[] {
  const localStorageProducts = localStorage.getItem(PRODUCTS_LOCAL_STORAGE_KEY);
  if (!localStorageProducts) {
    return [];
  }
  return JSON.parse(localStorageProducts) as Product[];
}

export function pushProductsToLocalStorage(products: Product[]) {
  const localStorageProducts = localStorage.getItem(PRODUCTS_LOCAL_STORAGE_KEY);
  const existingProducts = !!localStorageProducts ? JSON.parse(localStorageProducts) as Product[] : [];
  localStorage.setItem(PRODUCTS_LOCAL_STORAGE_KEY, JSON.stringify([...existingProducts, ...products]));
}
