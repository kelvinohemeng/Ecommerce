import React, { ReactNode } from "react";
import { PaystactProduct, Product } from "../types/types";
import { useCartStore } from "../stores/store";

const CartItem = ({
  key,
  item,
}: {
  key: string | number;
  item: PaystactProduct;
}) => {
  const { addItem, removeItem } = useCartStore();

  return (
    <div>
      <p>{item.name}</p>
      <p>{(item.price / 100).toFixed(2)}</p>
      <p>{item.quantity}</p>

      {/* Increase item quantity */}
      <button onClick={() => addItem(item)}>+</button>

      {/* Decrease item quantity or remove it if quantity is 1 */}
      <button onClick={() => removeItem(item.id)}>-</button>
    </div>
  );
};

export default CartItem;
