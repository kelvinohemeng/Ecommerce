import { create } from "zustand";
import { CartState, ProductState } from "../types/types";
import { fetchProducts } from "../utils/supabase";

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { items: [...state.items, { ...product, quantity: 1 }] };
      }
    }),

  removeItem: (productId) =>
    set((state) => ({
      // If quantity is greater than 1, reduce it. Otherwise, remove item completely.
      items: state.items
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0), // Remove items where quantity is 0
    })),

  clearCart: () => set({ items: [] }),
  totalPrice: () =>
    get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const data = await fetchProducts(); // Fetch products from Supabase
      set({ products: data }); // Update the state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));
