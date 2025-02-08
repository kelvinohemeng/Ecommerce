import CartItem from "./CartItem";
import { useCartStore } from "../stores/store";
import PayStackCheckout from "./PayStackCheckout";
import { useState } from "react";
import { PaystactProduct, Product } from "../types/types";

const Cart = () => {
  const { items, clearCart, totalPrice } = useCartStore();
  const [cart, setCart] = useState<Product>();

  const total = useCartStore((state) => state.totalPrice());
  return (
    <div className="cart max-w-[500px] p-4 w-full absolute border right-0 min-h-dvh bg-[#fefefe]">
      <h2>Shopping Cart</h2>
      {items.length > 0 ? (
        <>
          <ul>
            {items.map((item) => (
              <>
                <CartItem key={item.id} item={item} />
              </>
            ))}
          </ul>
          <button onClick={clearCart}>Clear Cart</button>
          <PayStackCheckout
            amount={total}
            // cart={items}
          />
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
