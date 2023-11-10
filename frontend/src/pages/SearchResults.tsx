import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useSearchQuery } from "../custom_hooks/useSearchQuery";
import Product from "../components/Product";


export interface IProduct  {
    _id: string
    title: string;
    price: string;
    description: string;
    mainImage: string;
    imagePaths: string[];
    category: string;
    inventory: number;
}

const SearchResults = () => {
    console.log("SearchResults component is rendering");
    const params = useParams();
    const {fetchSearch, isLoading, error} = useSearchQuery();
    const [searchResults, setSearchResults] = useState<IProduct[]>([]);



    //Fetch Products based on query using custom hook.
    useEffect(() => {

        
            fetchSearch(params.query!, (data) => setSearchResults(data));
        

    }, [params.query]);

    if (!searchResults || searchResults.length === 0) {
        return (
            <div className="hero">
                <p>Sorry, No Product's Found!</p>
            </div>
        );
    }

    

    return (
        <section className="hero">

            <div className="product-container">

                {searchResults.map(product => 
                <Product title={product.title} price={product.price} description={product.description} mainImage={product.mainImage} imagePaths={[]} category={product.category} _id={product._id} inventory={product.inventory} />
                )}

            </div>

        </section>
    );
    
}

export default SearchResults;