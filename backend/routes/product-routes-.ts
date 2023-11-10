import express, { Request, Response, Router } from "express";
import ProductModel from "../models/Product";
import { protectRoute } from "../middleware/protectRoute";
const productRouter = Router();

//Get All Products
productRouter.get("/products", async (req: Request, res: Response) => {

    try {

        const products = await ProductModel.find();

        return res.status(200).json({products: products});

    } catch (err: any) {
        return res.status(404).json({error: "Unable to fetch products, please try again."});
    }
});



// get a product by id
productRouter.get("/product/:id", async (req: Request, res:Response) => {
    try {

        const product = await ProductModel.findById(req.params.id);

        if (product) {
            return res.json({product: product});
        } else {
            throw new Error("Unable to Fetch Product")
        }

        
    } catch (err:any) {
        return res.status(404).json({error: "Unable to fetch Product at this time."});
    }
});



//Create a new product
productRouter.post("/product", protectRoute, async (req: Request, res: Response) => {
    try {

        const {title, price, description, mainImage, imagePaths, category, inventory} = req.body;

        const newProduct = await ProductModel.create({
            title,
            price,
            description,
            mainImage,
            imagePaths,
            category,
            inventory
        });


        return res.status(200).json({product: newProduct});

    } catch (err: any) {
        console.log(err.message);
        return res.status(404).json({error: "Unable to create product, please try again"});

    }
});


//Query products
productRouter.get("/product/search/:query", async (req: Request, res: Response) => {

    try {
        const query = req.params.query;


        const products = await ProductModel.find({title: {$regex: new RegExp(query, "i")}});

        //const filteredProducts = products.filter(product => product.title.includes(query));

        return res.status(200).json({products: products});

    } catch (err) {
        return res.status(400).json({error: "Unable to fetch products, please try again"})
    }

});







export default productRouter;