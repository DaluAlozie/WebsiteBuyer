import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabaseServiceRole } from '../../../utils/supabaseClient';
export default async function webhookHandler(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    if (req.method === 'POST'){

        try {
                const customer = await stripe.customers.create({
                email: req.body.record.email,
                metadata: {
                  user_id: req.body.record.id,
                },
              });

            if (customer){
                const { data, error } = await supabaseServiceRole
                    .from('profiles')
                    .update({
                        stripe_customer_id: customer.id,
                    })
                    .eq('id',req.body.record.id)

            }
      
            res.status(200).send()

        } catch (error) {
            console.log(error);
            return res.status(400).send(`Webhook error: ${error.message}`)
            
        }
    }
};