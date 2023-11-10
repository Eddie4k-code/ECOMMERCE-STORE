import {useState} from 'react';
import axios, { AxiosResponse } from 'axios';

/* Custom Hook for finding a product by id */

export const useFetchProductInfo = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const fetchProductInfo = async (id: string, onSuccess: (data:any) => void) => {

        try {
            setIsLoading(true);
            const response = await axios.get(process.env.REACT_APP_BACKEND_URL! + `/product/${id}`);

            const product = response.data.product;

            onSuccess(product);

            setIsLoading(false);

            return product;

        } catch(err:any) {

            setError(err.message);
            setIsLoading(false);

        }

    }


    return {fetchProductInfo, isLoading, error};

}