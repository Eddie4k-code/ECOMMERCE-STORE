import react, { useEffect, useState, createContext } from 'react';

import axios, {AxiosResponse} from 'axios';

/* Authentication is currently disabled as it is not needed for now. */

interface AuthContextStructure  {
    user: string | null
}

export const authContext = createContext<AuthContextStructure>({user: null}); //inital state

export const AuthContextProvider = ({children} : {children: React.ReactNode}) => {


    const [user, setUser] = useState<any | null>(null);


    useEffect(() => {

        const getTheUser = async () => {

            await axios.get(process.env.REACT_APP_BACKEND_URL + "/auth/getUser", {withCredentials: true}).then((res: AxiosResponse) => {
                if (res.data) {
                    //if theres data update user state.
                    localStorage.setItem("USER", JSON.stringify(res.data));
                    setUser(res.data);
                    console.log(user);
    
                }
            });

        }

        //getTheUser();

       
    }, []);




    return (

        <authContext.Provider value={{user}}>

            {children}

        </authContext.Provider>

    );

}