import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import { useAuthContext } from "../../custom_hooks/useAuthContext";
import { useEffect, useState } from "react";
import {TiShoppingCart} from 'react-icons/ti';
import CartModal from "../CartModal";
import { ICartProduct } from "../Product";
import { useCartContext } from "../../custom_hooks/useCartContext";

const Navbar = () => {
    const { user } = useAuthContext();
    const { cart } = useCartContext();
  const navigate = useNavigate();

  const [isCartModalOpen, setCartModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');


  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };




    return (


        <nav className="navbar">
        <a href="#" className="navbar__brand">UShopia</a>
        <div className="search-container">
          <form onSubmit={onSearch}>
          <input type="text" onChange={(e) => setSearchQuery(e.target.value)} className="navbar__search" placeholder="Search..." />
          </form>
        </div>
        <ul className="navbar__items">
          <li className="navbar__item"><a href="#">Home</a></li>
          <li className="navbar__item"><a className="shopping-cart" onClick={() => setCartModalOpen(true)}>{<TiShoppingCart />} <a>{cart.length}</a></a></li>
          {isCartModalOpen && <CartModal onClose={() => setCartModalOpen(false)} cartItems={cart}/>}
        </ul>
      </nav>

    );

}


export default Navbar;