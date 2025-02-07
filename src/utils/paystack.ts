import { loadPaystack } from "@paystack/checkout-js";

interface PaystackCheckoutProps {
  email: string; // Customer email
  amount: number; // Total amount in kobo (multiply by 100)
  reference: string; // Unique transaction reference
  onSuccess?: (reference: string) => void; // Callback on successful payment
  onClose?: () => void; // Callback on payment window close
}

export const payWithPaystack = async ({
  email,
  amount,
  reference,
  onSuccess,
  onClose,
}: PaystackCheckoutProps) => {
  try {
    const checkout = await loadPaystack({
      key: import.meta.env.VITE_PAYSTACK_SECRET_KEY, // Public Key from .env
      email,
      amount, // Convert to kobo
      currency: "GHS", // Change to your currency (e.g., "NGN", "USD")
      reference, // Unique transaction reference
      label: "Complete Your Purchase",
      onSuccess: () => {
        if (onSuccess) onSuccess(reference);
      },
      onClose: () => {
        if (onClose) onClose();
      },
    });

    checkout.openIframe(); // Opens the Paystack checkout modal
  } catch (error) {
    console.error("Paystack Checkout Error:", error);
  }
};
