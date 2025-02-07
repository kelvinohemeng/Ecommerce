import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useCartStore } from "../stores/store";
import { Product } from "../types/types";

import { PaystackButton, usePaystackPayment } from "react-paystack";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, clearCart, items, removeItem } = useCartStore();

  const cartItems = useCartStore((state) => state.items);
  const total = cartItems.reduce((sum, item) => sum + item.product_price, 0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("Products").select("*");

        if (error) throw error;

        if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();

    console.log(items);
  }, [items, setProducts]);

  const componentProps = {
    email: "johnny@example.com",
    amount: 90,
    currency: "GHS",
    metadata: {
      name: "John Doe",
      phone: 557552252,
    },
    publicKey: "pk_test_71a4f64c3fe892acf2fd163e5d59d664406a8bf6",
    text: "Buy Now",
    onSuccess: (reference: any) => {
      alert(
        `Your purchase was successful! Transaction reference: ${reference}`
      );
    },
    onClose: () => alert("Wait! You need this oil, don't go!!!!"),
  };

  return (
    <div className=" bg-red-300 text-bold">
      <p>Home</p>
      <div>
        {products &&
          products.map((product, index) => (
            <>
              <p>{product.product_name}</p>
              <div className="space-x-4">
                <button
                  className="px-4 py-1 bg-black text-white text-2xl"
                  onClick={() => addItem(product)}
                  key={index}
                >
                  Add to cart
                </button>

                <PaystackButton
                  className="paystack-button"
                  {...componentProps}
                />
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Home;
