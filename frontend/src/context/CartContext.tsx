import react, { useEffect, useState, createContext } from 'react';

import axios, { AxiosResponse } from 'axios';
import { ICartProduct } from '../components/Product';
import { updateArrayBindingPattern } from 'typescript';


interface CartContextStructure {
    cart: ICartProduct[]
    addItemToCart: Function
    removeItemFromCart: Function
    increaseCartItemQuantity: Function
    decreaseCartItemQuantity: Function
    addToCartError: string | null
    quantityError: string | null
}

export const cartContext = createContext<CartContextStructure>({ cart: [], addItemToCart: () => { }, removeItemFromCart: () => { }, increaseCartItemQuantity: () => { }, decreaseCartItemQuantity: () => { }, addToCartError: '', quantityError: '' }); //inital state

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {


    const [cart, setCart] = useState<ICartProduct[]>([]);
    const [addToCartError, setAddToCartError] = useState<string | null>('');
    const [quantityError, setQuantityError] = useState<string | null>('');


    const addItemToCart = (product: ICartProduct) => {

        //Check if product exists in cart already
        const findExistingProduct = cart.findIndex((item) => product.title === item.title);

        //If inventory is less than one, item is sold out.
       if (product.inventory < 1) {
            setAddToCartError("Sorry, this product is currently sold out!");
            setTimeout(() => {
                setAddToCartError(null)
            }, 7000);
            return;
       }


        //If item already exists in cart then make the user aware
        if (findExistingProduct !== -1) {
            setAddToCartError('This product is already in your cart!');
        } else {
            //Add new product to cart if its not already in the users inventory.
            setCart([...cart, product]);
        }



    }

    const increaseCartItemQuantity = (product: ICartProduct) => {
        
        const productIndex = cart.findIndex((item) => item.title === product.title);

        //Handle case where user tries to add more quantity than what inventory is available.
        if (product.inventory < product.quantity) {
            setQuantityError('Sorry, cannot increase quantity due to limited inventory!');
            setTimeout(() => {
                setQuantityError(null)
            }, 7000)
            return;
        }

        if (productIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[productIndex].quantity += 1;
            setCart(updatedCart);
        }
    };

    const decreaseCartItemQuantity = (product: ICartProduct) => {

        const productIndex = cart.findIndex((item) => item.title === product.title);

        if (productIndex !== -1 && cart[productIndex].quantity > 1) {
            const updatedCart = [...cart];
            updatedCart[productIndex].quantity -= 1;
            setCart(updatedCart);
        }
       
    }



    const removeItemFromCart = (producT: ICartProduct) => {

    }




    return (

        <cartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, increaseCartItemQuantity, decreaseCartItemQuantity, addToCartError, quantityError }}>

            {children}

        </cartContext.Provider>

    );

}