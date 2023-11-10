import express, { Request, Response, Router } from "express";
import { Stripe } from 'stripe';



/* Routes for payments */

const paymentRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16'
});

//Create a new checkout session
paymentRouter.post('/create-checkout-session', async (req:Request, res:Response) => {

    try {

        const {items} = req.body;

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item:any) => {
                const unitAmountCents = parseFloat(item.price) * 100 //Stripe takes price in cents
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.title
                        },
                        unit_amount: unitAmountCents
                    },
                    quantity: parseInt(item.quantity)
                }
            }),
            mode: 'payment',
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US']
            },
            success_url: process.env.FRONTEND_URL + "/success",
            cancel_url: process.env.FRONTEND_URL + "/cancelled",
            automatic_tax: {
                enabled: true
            }
        });

        return res.json({url: checkoutSession.url});

    } catch (err:any) {
        res.status(500).json({error: err.message});
    }
});

export default paymentRouter;












