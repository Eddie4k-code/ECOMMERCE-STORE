import exp from 'constants';
import cors from 'cors';
import express from 'express';
import mongoose  from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import 'dotenv/config'
//import authRouter from './routes/auth/auth-routes'; (Auth Disabled for now)
import productRouter from './routes/product-routes-';
import paymentRouter from './routes/payment-routes';
import { Stripe } from 'stripe';
import ProductModel from './models/Product';
import orderRouter from './routes/order-routes';
import OrderModel from './models/Order';
import { MessageContextTypes, setMailDetailsAndSend } from './emailer/mailer';


const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16'
});

app.use(cors({credentials: true, origin:process.env.FRONTEND_URL!}));


//WebHook Start

app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature']!;
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.ENDPOINT_SECRET!);
      console.log("Webhook Verified");
    } catch (err: any) {
      console.log(err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    
    switch (event.type) {
        //On A Completed checkout update inventory accordingly and create a new order for records.
        case 'checkout.session.completed':

        const checkoutSessionCompleted = event.data.object as Stripe.Checkout.Session;

  

       
        const fetchedSession = await stripe.checkout.sessions.retrieve(checkoutSessionCompleted.id, {
          expand: ['line_items'],
        });

        console.log(fetchedSession);

        const lineItems = fetchedSession.line_items?.data;
        try {
          await Promise.all(lineItems!.map(async (item) => {
            const { description, quantity } = item;
  
            const lookupItem = await ProductModel.findOne({ title: description });
  
            if (!lookupItem) {
              console.log(`Item not found in the database: ${description}`);
              return;
            }
  
            lookupItem.inventory -= quantity!;
            await lookupItem.save();
  
            console.log(`Inventory updated for ${description}. New inventory: ${lookupItem.inventory}`);
          }));

          //Create new order for records using the customer information
          const newOrder = await OrderModel.create({
            customerName: fetchedSession.customer_details!.name,
            city: fetchedSession.customer_details!.address!.city,
            address1: fetchedSession.customer_details!.address!.line1,
            postal_code: fetchedSession.customer_details!.address!.postal_code,
            state: fetchedSession.customer_details!.address!.state,
            email: fetchedSession.customer_details!.email,
          });


          //Functionality to email customer with order details such as we will provide you with tracking soon :)
          await setMailDetailsAndSend(MessageContextTypes.NEW, newOrder.email);


          
        } catch (err: any) {
          console.log(err);
        }
  
        break; 
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.send();
});
//WebHook End
//JSON Express Middleware
app.use(express.json());



//Connect to Mongo DB
mongoose.connect(process.env.MONGO_URI!).then(() => console.log("Db Connected"));

//Session
app.use(session({
    secret: process.env.SECRET!,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
}));

//Routers and other middleware
app.use(passport.initialize());
app.use(passport.session());
//app.use("/", authRouter); (Auth Disabled for now)
app.use("/", productRouter);
app.use("/", paymentRouter);
app.use("/", orderRouter);





app.listen(process.env.PORT!);


