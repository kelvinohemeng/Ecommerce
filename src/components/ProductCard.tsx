import { useCartStore } from "../stores/store";
import { PaystactProduct, Product } from "../types/types";
import { navigator } from "../utils";

type ProdcutCardT = {
  product: Product;
};
const ProductCard = ({ product }: ProdcutCardT) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
  };
  return (
    <div className="product-card">
      {/* <img
        className="max-w-[250px]"
        src={product.files[0].path}
        alt={product.files[0].original_filename}
      /> */}
      <h3>{product.product_name}</h3>
      <p>GHC {product.product_price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
