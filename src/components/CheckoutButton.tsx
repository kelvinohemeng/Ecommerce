import { useCartStore } from "../stores/store";

const CheckoutButton = () => {
  const { items, totalPrice } = useCartStore();

  const handleCheckout = async () => {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "customer@example.com", // Replace with actual customer email
          amount: (totalPrice() / 100).toFixed(2), // Convert to kobo (smallest currency unit)
          currency: "NGN",
          callback_url: "https://yourwebsite.com/payment-success", // Redirect after successful payment
          metadata: {
            cart: items, // Send cart items for reference
          },
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      window.location.href = data.data.authorization_url; // Redirect to Paystack
    } else {
      console.error("Payment initialization failed:", data.message);
    }
  };

  return (
    <button className="p-4 bg-[#1a1a1a] text-white" onClick={handleCheckout}>
      Checkout
    </button>
  );
};

export default CheckoutButton;
