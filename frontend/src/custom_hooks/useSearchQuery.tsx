import {useState} from 'react';
import axios, { AxiosResponse } from 'axios';

/* Custom Hook for making searches based on a query */

export const useSearchQuery = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const fetchSearch = async (query: string, onSuccess: (data:any) => void) => {

        try {
            setIsLoading(true);
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL! + `/product/search/${query}`);

            const products = response.data.products;

            onSuccess(products);

            return products;

        } catch(err:any) {

            setError(err.message);

        }

    }


    return {fetchSearch, isLoading, error};

}