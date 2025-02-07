import { useCartStore } from "../stores/store";
import { PaystactProduct, Product } from "../types/types";
import { navigator } from "../utils";

type ProdcutCardT = {
  product: PaystactProduct;
};
const ProductCard = ({ product }: ProdcutCardT) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
  };
  const handleBuy = () => {
    window.location.href = `https://paystack.com/buy/${product.slug}`;
  };

  return (
    <div className="product-card">
      <img
        className="max-w-[250px]"
        src={product.files[0].path}
        alt={product.files[0].original_filename}
      />
      <h3>{product.name}</h3>
      <p>
        {product.currency} {(product.price / 100).toFixed(2)}
      </p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuy}>Buy</button>
    </div>
  );
};

export default ProductCard;
