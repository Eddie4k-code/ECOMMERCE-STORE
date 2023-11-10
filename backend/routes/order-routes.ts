
import express, {Request, Response, Router} from 'express';
import OrderModel from '../models/Order';
import { error } from 'console';
import { MessageContextTypes, setMailDetailsAndSend } from '../emailer/mailer';

const orderRouter = Router();

//Get All Orders
orderRouter.get('/orders', async (req: Request, res:Response) => {

    try {

        const orders = await OrderModel.find();

        return res.status(200).json({orders: orders});

    } catch(err:any) {
        return res.status(404).json({error: err.message})
    }

});

//Update an Order
orderRouter.put('/orders/:orderId', async (req: Request, res:Response) => {

    try {

        const {orderId} = req.params;

        let existingOrder = await OrderModel.findById(orderId);



        if (!existingOrder) {
            return res.status(404).json({error: "Cannot find order with order ID: " + orderId});
        }

        //On order Status Update send email to customer
        if (req.body.status === 'shipped') {
            //Send email to customer with tracking number
            await setMailDetailsAndSend(MessageContextTypes.SHIPPED, existingOrder.email, existingOrder.trackingNumber!)
        }

        //Update order...
        existingOrder.set(req.body);
        await existingOrder.save()

        return res.status(200).json({message: "Order has been updated!"});

        

    } catch(err:any) {
        console.log(err.message);
        return res.status(404).json({error: err.message})
    }

    


});






export default orderRouter;
