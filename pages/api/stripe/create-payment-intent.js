import { NextResponse } from 'next/server'
import  { Nextreq } from 'next/server'
import { supabase } from '../../../utils/supabaseClient';

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const productList = {
  "standard": {
    price: 1400, 
    description: "Standard"
  }
}

export default async function handler(req, res) {  

  const { user, error } = await supabase.auth.api.getUserByCookie(req);

  if (error) return res.status(error.status).send(error.message);

  const { order } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: productList[order].price,
    description: productList[order].description,
    currency: "gbp",
    customer: req.body.customer_id,
    receipt_email: user.email,
    metadata: {
      user_id: user.id,
      email: user.email,
    }
  });

  res.status(200).send({clientSecret: paymentIntent.client_secret});
};