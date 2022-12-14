import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { supabase } from "../../utils/supabaseClient";
import toast from "react-hot-toast";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutWrapper({children}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createPaymentIntent()
  }, []);


  async function createPaymentIntent() {
    
    const user = supabase.auth.user()
    const { data, error} = await supabase
      .from('profiles')
      .select("stripe_customer_id")
      .eq('id', user.id)
      .single()

    if (!data.stripe_customer_id) return toast.error("Something went wrong")
    // Create PaymentIntent as soon as the page loads
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        customer_id: data.stripe_customer_id,
        order: "standard"
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
            {children}
        </Elements>
      )}
    </div>
  );
}