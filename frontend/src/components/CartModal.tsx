import { ICartProduct } from "./Product"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useCartContext } from "../custom_hooks/useCartContext";

interface CartModalProps {
    onClose: () => void
    cartItems: ICartProduct[]
}

const CartModal = ({ onClose, cartItems }: CartModalProps) => {

    const navigate = useNavigate();
    const [updatedCartItems, setUpdatedCartItems] = useState<ICartProduct[]>(cartItems)
    const { cart, increaseCartItemQuantity, decreaseCartItemQuantity, quantityError } = useCartContext();

    //Updates Cart whenever there is a quantity change
    useEffect(() => {

        setUpdatedCartItems(cart);

    }, [increaseCartItemQuantity, decreaseCartItemQuantity])

    const onCheckoutClick = async () => {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL! + "/create-checkout-session", {
            items: updatedCartItems
        }, { withCredentials: true });

        if (response.status === 200) {
            window.location = response.data.url;
        } else {
            navigate(process.env.REACT_APP_FRONTEND_URL!)
        }
    }


  
    return (
        <div className="cart-modal">
            <h2>Your Cart</h2>

            <ul className="cart-items">
                {updatedCartItems.map((item) => (
                    <li key={item.title} className="cart-items">
                        <div className="product-info">
                            <img src={item.mainImage} alt={item.title} className="product-image" />
                            <div className="product-details">
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>
                                <div className="quantity-control">
                                    <button className="quantity-button" onClick={() => decreaseCartItemQuantity(item)}> - </button>
                                    <p className="quantity">{item.quantity}</p>
                                    <button className="quantity-button" onClick={() => increaseCartItemQuantity(item)}> + </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
                <p className="sold-out-message">{quantityError && quantityError}</p>
            </ul>

            <button onClick={onCheckoutClick}>Checkout</button>
            <button onClick={onClose}>Close</button>
        </div>
    );


}

export default CartModal;