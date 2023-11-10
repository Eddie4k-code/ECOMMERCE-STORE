import axios from 'axios';
import {useState} from 'react';

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //Opens seperate window for google authentication
    const googleLogin = () => {
        window.open(process.env.REACT_APP_BACKEND_URL! + "/auth/google");
    }

    const localLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const res = await axios.post(process.env.REACT_APP_BACKEND_URL + "/auth/login", {email: email, password: password}, {withCredentials: true});

        const data = res.status;

        console.log(data);
        
    }


    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login to Your Account</h2>
                <form>
                    <input type="text" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" onClick={localLogin}>Login</button>
                    <button className="google-btn" onClick={googleLogin}>Login With Google</button>
                </form>
            </div>
        </div>
    );

}


export default Login;