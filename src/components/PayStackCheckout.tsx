import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router";
import { supabase } from "../utils/supabase";
import { useEffect } from "react";

interface PaystackT {
  email: string;
  amount: number;
}

const PayStackCheckout = ({ email, amount }: PaystackT) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const ammount = amount;
  const navigate = useNavigate();

  const saveTransaction = async (reference: any) => {
    const { error } = await supabase.from("Orders").insert({
      email,
      amount,
      reference,
      status: "success",
      created_at: new Date(),
    });

    if (error) console.error("Error saving transaction:", error);
  };

  const onSuccess = (response: any) => {
    console.log("Payment Successful:", response);
    saveTransaction(response.reference);
    navigate("/success");
  };

  const onClose = () => {
    console.log("Payment closed");
    navigate("/cart");
  };

  const componentProps = {
    email,
    amount: ammount,
    currency: "GHS",
    publicKey,
    text: "Pay Now",
    onSuccess,
    onClose,
  };

  useEffect(() => {}, []);

  return (
    <div className="paystack-button">
      <PaystackButton {...componentProps} />
    </div>
  );
};

export default PayStackCheckout;
