import CartItem from "./CartItem";
import { useCartStore } from "../stores/store";
import PayStackCheckout from "./PayStackCheckout";
import { useState } from "react";
import { PaystactProduct } from "../types/types";

const Cart = () => {
  const { items, clearCart } = useCartStore();
  const [cart, setCart] = useState<PaystactProduct>();

  const totalPrice = useCartStore((state) => state.totalPrice());
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
          <p>Total: ${(totalPrice / 100).toFixed(2)}</p>
          <button onClick={clearCart}>Clear Cart</button>
          <PayStackCheckout
            amount={totalPrice}
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
