export interface ProductCardType {
  id: number,
  product_name: string,
  product_image: string,
  rating: number,
  offer_price: number
}

export interface soloProductType extends ProductCardType {
  description: string,
  category: string,
  brand: string,
  price: number,
  seller_name: string,
  created_at: string
}