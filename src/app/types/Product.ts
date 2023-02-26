export default class Product {
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Clothes' | 'Blankets';
  imageUrl: string;
  phoneNumber: number;
  select: 'Mobile' | 'Landline';
}
