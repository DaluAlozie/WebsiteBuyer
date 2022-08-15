import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import Form from "../FormComponents/form";
import Button from "../FormComponents/button";
import { supabase } from "../../utils/supabaseClient";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = supabase.auth.user()
    setEmail(user.email)
  },[])
    useEffect(() => {
      if (!stripe) {
        return;
      }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          toast.success("Payment succeeded!");
          break;
        case "processing":
          toast.loading("Your payment is processing.");
          break;
        case "requires_payment_method":
          toast.error("Your payment was not successful, please try again.");
          break;
        default:
          toast.error("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

    async function handleSubmit(e){
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
          receipt_email: email,
        },
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      toast.error(error.message);
    } else if(error){
      toast.error("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <Form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
    </Form>
  );
}