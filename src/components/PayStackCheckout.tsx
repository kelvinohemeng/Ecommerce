// components/Checkout.tsx
import { useCartStore } from "../stores/store";
import { useState } from "react";

const PayStackCheckout = ({ amount }: { amount: number }) => {
  const { items } = useCartStore();
  const [email, setEmail] = useState("");

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount, // Paystack expects amount in kobo
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      window.location.href = data.data.authorization_url; // Redirect to Paystack payment page
    } else {
      alert("Failed to initialize payment. Please try again.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${(item.price / 100).toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${(amount / 100).toFixed(2)}</p>
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default PayStackCheckout;
