// LoginComp.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginComp.css'; 
import { useNavigate } from 'react-router-dom';

const login_url = "http://localhost:3000/login";

const LoginComp = () => {
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserLogin({ ...userLogin, [name]: value });
    };

    const Login = async () => {
        try {
            const req = await axios.post(login_url, userLogin);
            if (req.status === 200) {
                navigate("/main-page/movies");
            } else {
                setErrorMessage("Wrong username or password"); 
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("please check your username and password."); 
        }
    };

    return (
        <div className="login-container">
            <strong>Log in page</strong>
            <br />
            User Name: <input type="text" name="username" placeholder="Enter your username" onChange={handleChange} />
            <br />
            Password: <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
            <br />
            <button onClick={Login}>Login</button>
            {errorMessage && <p className="alert">{errorMessage}</p>} 
        </div>
    );
};

export default LoginComp;
