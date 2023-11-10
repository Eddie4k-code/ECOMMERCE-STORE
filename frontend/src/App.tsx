import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContextProvider } from './context/AuthContext';
import SearchResults from './pages/SearchResults';
import Test from './pages/Test';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Cancelled from './pages/Cancel';
import { CartContextProvider } from './context/CartContext';
import ProductDetail from './pages/ProductDetail';



function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <CartContextProvider>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            {/* <Route path="/login" element={<Login />} /> - (AUTHENTICATION DISABLED FOR NOW) */ }
            <Route path="/" element={<Landing />} />
            {/* <Route path="/register" element={<Register />} />  - (AUTHENTICATION DISABLED FOR NOW) */}
            <Route path="/search/:query" element={<SearchResults/>} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancelled" element={<Cancelled />} />
            <Route path="/test" element={<Test />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
          </Routes>
        </AuthContextProvider>
       </CartContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
