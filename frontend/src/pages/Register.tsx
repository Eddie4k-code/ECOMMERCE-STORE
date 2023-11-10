import axios from 'axios';
import { ButtonHTMLAttributes, useState } from 'react';


const Register = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordsMatch, setPasswordsMatch] = useState<string | null>();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordsMatch("Passwords do not match!");
        } else {
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL! + "/auth/register",  {
                email,
                password
            }, {withCredentials: true});

            console.log(res.data);
        }




    }



    return (

        <div className="register-page">
        <div className="register-container">
            <h2>Create an Account</h2>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                <button type="submit" onClick={handleSubmit}>Register Now</button>
            </form>

            {passwordsMatch}
        </div>
    </div>

        
    );
}

export default Register;