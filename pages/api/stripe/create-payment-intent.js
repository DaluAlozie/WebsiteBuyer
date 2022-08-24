import { NextResponse } from 'next/server'
import  { Nextreq } from 'next/server'
import { supabase } from "../../../utils/supabaseClient";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

function calculateOrderAmount(items){
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};


export default async function handler(req, res) {
  const token = req.cookies['sb-access-token'];
  
  if (token){
    const user = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    }).then((res) => res.json());
    
    const { items } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "gbp",
      metadata: {
        user_id: user.id,
        email: user.email,
      }
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  }
};