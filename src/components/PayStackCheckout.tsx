// components/Checkout.tsx
import { PaystackButton, usePaystackPayment } from "react-paystack";
import { useCartStore } from "../stores/store";
import { useState } from "react";
import { supabase } from "../utils/supabase";
import { callback, PaystackProps } from "react-paystack/dist/types";
import { navigator } from "../utils";

const PayStackCheckout = ({ amount }: { amount: number }) => {
  const { items } = useCartStore();
  const [email, setEmail] = useState("");

  // const handlePayment = async () => {
  //   if (!email) {
  //     alert("Please enter your email address.");
  //     return;
  //   }

  //   const response = await fetch(
  //     "https://api.paystack.co/transaction/initialize",
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${import.meta.env.VITE_PAYSTACK_SECRET_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email,
  //         amount: amount * 100,
  //       }),
  //     }
  //   );

  //   const data = await response.json();
  //   if (data.status) {
  //     window.location.href = data.data.authorization_url; // Redirect to Paystack payment page
  //   } else {
  //     alert("Failed to initialize payment. Please try again.");
  //   }
  // };

  const paystackConfig: PaystackProps = {
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    currency: "GHS",
    reference: new Date().getTime().toString(),
    email: email,
    amount: 0.1 * 100,
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const onSuccess = async (response: callback) => {
    // Save order to Supabase
    try {
      // Log the response to see if we are getting the expected data
      console.log("Payment Success Response:", response);

      // Save order to Supabase
      const { data, error } = await supabase.from("Orders").insert([
        {
          id: 4465,
          items: [
            {
              product_name: "Product 1",
              product_price: 20.0,
              quantity: 2,
            },
            {
              product_name: "Product 2",
              product_price: 15.0,
              quantity: 1,
            },
          ],
          total: amount,
          status: "paid",
          created_at: new Date().toISOString(), // Use ISO string format for date
          payment_ref: "paystack_payment_ref_12345",
          email: email,
        },
      ]);

      if (error) {
        console.error("Error inserting order:", error); // Log any error
        alert("There was an error processing your payment. Please try again.");
      } else {
        console.log("Order inserted successfully:", data);
        useCartStore.getState().clearCart();
        // Redirect to success page
        navigator("/");
      }
    } catch (error) {
      console.error("Error in onSuccess:", error); // Log any unexpected errors
      alert("Unexpected error occurred. Please try again.");
    }
  };

  const onError = (error: any) => {
    console.error("Payment failed:", error);
    alert("Payment failed. Please try again.");
  };

  const onClose = () => {
    console.log("Payment process closed");
    alert("You closed the payment process.");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product_name} - ${item.product_price.toFixed(2)} x{" "}
            {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${amount}</p>
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <button onClick={handlePayment}> */}
      <div>
        <button
          onClick={() => initializePayment(onSuccess, onError, onClose)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg"
        >
          Pay GHC{amount}
        </button>
      </div>
    </div>
  );
};

export default PayStackCheckout;
