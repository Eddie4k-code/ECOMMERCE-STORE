import { useNavigate } from "react-router-dom";
import { useCartContext } from "../custom_hooks/useCartContext";
import { IProduct } from "../pages/SearchResults";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";


/* Component for a Single Product */




//Structure of a product in a user cart.
export interface ICartProduct {
    title: string,
    mainImage: string,
    description: string,
    category: string,
    price: string,
    imagePaths: string[],
    quantity: number,
    inventory: number
}


interface ICart {
    products: ICartProduct[]
}


const Product = ({ title, mainImage, description, category, price, imagePaths, _id, inventory}: IProduct) => {

    const { cart, addItemToCart, addToCartError} = useCartContext();
    const navigate = useNavigate();

    //Current Product that is selected
    const currentProduct: ICartProduct = {
        title,
        mainImage,
        description,
        category,
        price,
        imagePaths,
        quantity: 1,
        inventory
    }


    const increaseQuantity = () => {
        
    }


    const decreaseQuantity = () => {
        
    }
    
    const viewItem = () => {

        navigate(`/product-detail/${_id}`);

    }




    
   

      

    return (

        <div className="product">
            <img src={mainImage}/>
            <h3>{title}</h3>
            {/*<p>{description}</p>*/}
            <span className="price">${price}</span>
            <a onClick={() => addItemToCart(currentProduct)} className="btn">Add to Cart</a>
            <a onClick={viewItem} className="btn">View Item</a>

            <p className="sold-out-message">{addToCartError && addToCartError}</p>

        </div>

    );
}

export default Product;


