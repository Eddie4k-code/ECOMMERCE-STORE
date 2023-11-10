import {useState} from 'react';
import axios, { AxiosResponse } from 'axios';

/* Custom Hook for making searches based on a query */

export const useFetchProducts = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const fetchProducts = async ( onSuccess: (data:any) => void) => {

        try {
            setIsLoading(true);
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL! + "/products");

            const products = response.data.products;

            onSuccess(products);

            setIsLoading(false);

            return products;

        } catch(err:any) {

            setError(err.message);

        }

    }


    return {fetchProducts, isLoading, error};

}