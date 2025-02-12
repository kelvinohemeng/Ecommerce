import { useEffect, useState } from "react";
import { fetchProducts, supabase } from "../utils/supabase";
import { useCartStore, useProductStore } from "../stores/store";
import { PaystactProduct, Product } from "../types/types";

import { PaystackButton, usePaystackPayment } from "react-paystack";
import PayStackCheckout from "../components/PayStackCheckout";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

const Home = () => {
  const { products, fetchProducts } = useProductStore();

  const { addItem, clearCart, items, removeItem } = useCartStore();

  // {PAYSTACT API FETCH ALL PRODUCTS}
  // const fetchPaystackProducts = async () => {
  //   const response = await fetch("https://api.paystack.co/product", {
  //     headers: {
  //       Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
  //     },
  //   });
  //   const data = await response.json();
  //   return data.data; // Array of products
  // };
  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, [items]);
  return (
    <div className=" bg-red-300 text-bold">
      <Cart />
      <p>Home</p>
      <div>
        {products &&
          products.map((product, index) => (
            <>
              <div>
                <ProductCard product={product} />
              </div>

              {/* <PaystackButton
                  className="paystack-button"
                  {...componentProps}
                /> */}

              {/* <PayStackCheckout email="johnny@example.com" amount={9} /> */}
            </>
          ))}
      </div>
    </div>
  );
};

export default Home;
