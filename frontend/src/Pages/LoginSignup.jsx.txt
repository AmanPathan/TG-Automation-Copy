import React, {useState} from "react";
import "./LoginSignup.css";
import emailIcon from "../src/utils/email.png";
import personIcon from "../src/utils/person.png";
import passwordIcon from "../src/utils/password.png";
import { Link } from "react-router-dom";

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const isSignUpEnabled = action === "Sign Up" && name && email && password; 

    return (
        <form className="container">
            
            <div className="header">
                <div className="text">
                    {action}
                </div>
                <div className="underline"></div>
            </div>
                        
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={personIcon} alt="" />
                        <input type = "text" placeholder="Enter your Name" value={name} onChange={handleNameChange} requierd />
                    </div>
                )}
                
                <div className="input">
                    <img src={emailIcon} alt="" />
                    <input type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange} required />
                </div>
            </div>

            {action === "Sign Up" ? null : (
                <div className="forgot-password">
                    Lost Password?<span>Click Here!</span> 
                </div>
            )}
            <div className="submit-container">
                <button
                className={action === "Login" ? "submit gray" : "submit"}
                onClick={() => {
                    setAction("Sign Up");
                }}
                type="submit"
                >{action === "Sign Up" ? (
                    isSignUpEnabled ? <Link to="/infoForm">Sign Up</Link> : <span>Sign Up</span>
                ) : (
                    <span>Sign Up</span>
                )}
                </button>

                <button
                className={action === "Sign Up" ? "gray submit" : "submit"}
                onClick={() => {
                    setAction("Login");
                }}
                type="submit"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default LoginSignup;