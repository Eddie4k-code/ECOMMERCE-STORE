import { useContext } from "react";
import { authContext } from "../context/AuthContext";


//Provides a way to access AuthContext values without have to use useContext hook.
export const useAuthContext = () => {
    const context = useContext(authContext);

    if (!context) {
        throw Error('useAuthContext must be used inside AuthContextProvider');
    }

    return context;
}