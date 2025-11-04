interface ProductCardType {
  id: number,
  name: string,
  image: string,
  rating: number,
  offer_price: number
}

interface soloProductType extends ProductCardType {
  description: string,
  category: string,
  brand: string,
  price: number,
  sellerid: number,
  created_at: string
}