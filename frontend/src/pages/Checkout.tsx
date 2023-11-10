
import {useEffect, useState} from 'react';
import { ICartProduct } from '../components/Product';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
    const [cartItems, setCartItems] = useState<ICartProduct[]>([]);
    const navigate = useNavigate();
    const [error ,setError] = useState<string>('');

    const onCheckoutClick = async () => {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL! + "/create-checkout-session", {
            items: cartItems
        }, {withCredentials: true});

        if (response.status === 200) {
            window.location = response.data.url;
        } else {
            navigate(process.env.REACT_APP_FRONTEND_URL!)
        }
    }



    useEffect(() => {
        //Fetch all items in cart from localStorage
        if (localStorage.getItem("user__cart")) {
            let parsedCart = JSON.parse(localStorage.getItem("user__cart")!);
            setCartItems(parsedCart.products);
        }

    }, []);



    return (

        <div>

            <ul>
                {cartItems.map((product) => 
                
                <li>{product.title}</li>
                
                )}
            </ul> 

            <button onClick={onCheckoutClick}>
                Checkout!
            </button>

        </div>


    );



}


export default Checkout;