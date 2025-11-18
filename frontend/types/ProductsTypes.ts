export interface ProductCardType {
  id: number;
  product_name: string;
  product_image: string;
  rating: number;
  offer_price: number;
  price: number;
  product_stock: number;
  offer_percentage: number;
}

export interface soloProductType extends ProductCardType {
  description: string;
  category: string;
  brand: string;
  created_at: string;
}
