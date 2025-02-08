import React, { ReactNode } from "react";
import { PaystactProduct, Product } from "../types/types";
import { useCartStore } from "../stores/store";

const CartItem = ({ key, item }: { key: string | number; item: Product }) => {
  const { addItem, removeItem } = useCartStore();

  return (
    <div>
      <p>{item.product_name}</p>
      <p>{item.product_price.toFixed(2)}</p>
      <p>{item.quantity}</p>

      {/* Increase item quantity */}
      <button onClick={() => addItem(item)}>+</button>

      {/* Decrease item quantity or remove it if quantity is 1 */}
      <button onClick={() => removeItem(item.id)}>-</button>
    </div>
  );
};

export default CartItem;
