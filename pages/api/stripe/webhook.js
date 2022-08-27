import Stripe from 'stripe';
import { buffer } from 'micro';


export const config = {
    api: {
        bodyParser: false,
    }
}
export default async function webhookHandler(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    if (req.method === 'POST'){
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']
        const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET

        let event;

        try {
            if (!sig || !webhookSecret) return;
            
            event = stripe.webhooks.constructEvent(buf,sig,webhookSecret)
            
            let paymentIntent;
            switch (event.type) {
                case 'payment_intent.succeeded':
                    paymentIntent = event.data.object

                    break;
                default:
                    console.warn(`Unhandled event type: ${event.type}`);
                    res.status(200).end();
                    return;
            }

            res.status(200).send()

        } catch (error) {
            console.log(error);
            return res.status(400).send(`Webhook error: ${error.message}`)
            
        }
    }
};