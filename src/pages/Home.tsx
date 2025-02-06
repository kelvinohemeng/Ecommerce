import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useCartStore } from "../stores/store";
import { Product } from "../types/types";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem, clearCart, items, removeItem } = useCartStore();

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
  return (
    <div className=" bg-red-300 text-bold">
      <p>Home</p>
      <div>
        {products &&
          products.map((product, index) => (
            <>
              <p>{product.product_name}</p>
              <button
                className="px-4 py-1 bg-black text-white text-2xl"
                onClick={() => addItem(product)}
                key={index}
              >
                Add to cart
              </button>
            </>
          ))}
      </div>
    </div>
  );
};

export default Home;
