import { useContext } from "react";
import { cartContext } from "../context/CartContext";


//Provides a way to access CartContext values without have to use useContext hook.
export const useCartContext = () => {
    const context = useContext(cartContext);

    if (!context) {
        throw Error('useCartContext must be used inside CartContextProvider');
    }

    return context;
}