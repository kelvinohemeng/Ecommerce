export interface Product {
  id: string | number;
  product_name: string;
  create_at: string;
  product_description: string;
  product_price: number;
  product_type: string;
  stock: number;
}

export interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}
