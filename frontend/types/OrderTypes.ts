interface OrderType {
  id: number;
  product_id: number;
  offer_price: number;
  order_status: string;
  product_image: string;
  product_name: string;
  quantity: number;
  subtotal: number;
  created_at: string;
}

interface SingleOrderType extends OrderType {
  description: string;
  address: string;
  phone: string;
  full_name: string;
  message: string | null;
}
