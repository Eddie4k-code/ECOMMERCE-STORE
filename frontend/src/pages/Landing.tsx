import { useEffect, useState } from "react";
import Product from "../components/Product";
import { IProduct } from "./SearchResults";
import { useFetchProducts } from "../custom_hooks/useFetchProducts";

const Landing = () => {
    
    const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
    const {isLoading, fetchProducts} = useFetchProducts();

    //Fetch all products and store it into featured products state
    useEffect(() => {

        fetchProducts((data) => setFeaturedProducts(data));

    }, []);

    return (

        <>
        <section className="hero">
        <h2>Welcome to UShopia!</h2>
        <p className="free-shipping">FREE SHIPPING ON ALL ORDERS</p>
    </section>

    <h2 className="featured__product__title">Products Currently in Stock!</h2>
      

    <section className="featured-products">
   
        <div className="product-container">
        
        {isLoading && <p>Loading Products...</p>}

        {featuredProducts && featuredProducts.map(product => 

<Product title={product.title} price={product.price} description="Get ready to cheer on the Bills in style and compliance with this must-have accessory for game day. Our clear stadium-approved crossbody bag is the perfect blend of fashion and function, allowing you to support your team while adhering to stadium regulations. Dimensions:25 34.6 (in) Adjustable Strap, Bag is 11 x 6.7 x 6.3 (in)" mainImage={product.mainImage} imagePaths={[]} category={product.category} _id={product._id} inventory={product.inventory} />
            
            )}
        
        </div>
    </section>

    </>
      
        

        


    );



}



export default Landing;