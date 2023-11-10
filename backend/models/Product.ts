import mongoose, { Schema } from 'mongoose';

/* Mongo Model for each specific Product */

interface ProductDocument extends Document {
    title: string
    price: string
    description: string
    mainImage: string
    imagePaths: string[]
    category: string
    inventory: number
}


const ProductSchema: Schema = new Schema({
    title: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String, required: true},
    mainImage: {type: String, required: true},
    imagePaths: {type: Array, required: false},
    category: {type: String, required: true},
    inventory: {type: Number, required: true}
});

const ProductModel = mongoose.model<ProductDocument>('Products', ProductSchema);

export default ProductModel;
