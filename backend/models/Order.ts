import mongoose, { Schema } from 'mongoose';

/* Mongo Model for Orders */

interface OrderDocument extends Document {
    customerName: string
    city: string
    address1: string
    postal_code: string
    state: string
    email: string
    trackingNumber: string | null
    createdAt: Date;
    status: string
}


const OrderSchema: Schema = new Schema({
    customerName: {type: String, required: true},
    city: {type: String, required: true},
    address1: {type:String, required: true},
    postal_code: {type: String, required: true},
    state: { type: String, required: true },
    email: { type: String, required: true },
    trackingNumber: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    status: {type: String, default: 'new', required: true}
});

const OrderModel = mongoose.model<OrderDocument>('Orders', OrderSchema);

export default OrderModel;
