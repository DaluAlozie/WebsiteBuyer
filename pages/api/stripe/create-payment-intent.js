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

const productList = {
  "standard": {
    price: 1400, 
    description: "Standard"
  }
}

export default async function handler(req, res) {  

  const { order } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: productList[order].price,
    description: productList[order].description,
    currency: "gbp",
    customer: req.body.customer_id,
    receipt_email: req.body.user_email,
    metadata: {
      user_id: req.body.user_id,
      email: req.body.user_email,
    }
  });

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};