
import React, { useState, } from "react";
import '../Css/Login.css'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import Cookies from 'js-cookie';
import { BASE_URL } from "../Constants";

const Login = () => {

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const token = Cookies.get('token');
    if(token){
        window.location.href = "/userDashboard";
    }else{
    function loginUser()
    {
        
        let data = { email,password}
        console.warn(data);
        fetch(BASE_URL+"login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

        },
            body: JSON.stringify(data)
        }).then(result => {
            console.warn("result", result);
            return result.json();            
        }).then(responseData => {
            console.warn("data", responseData);
            const { success } = responseData;
            const {token}= responseData.data;
           if(success){
            Cookies.set('token', token, { expires: 7, secure: true });
            window.location.href = "/userDashboard";
           }

        }).catch(error => {
            console.error('Error:', error);
            setError('Invalid Email or Password');
        });
    }

    return(
        <div className="container">
            <div>
            <img src={logo} className="login-logo-img"/>
            <div className="login-header">
                <p>Login</p>
            </div>
            {error && <div className="invalid-error" role="alert">{error}</div>}

            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><img src={email_icon} className="login-icon"/></span>
                <input type="text" class="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} 
                required placeholder="email address" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><img src={password_icon} className="login-icon"/></span>
                <input type={showPassword ? "text" : "password"} class="form-control"value={password} onChange={(e)=>{setPassword(e.target.value)}}
                required placeholder="password" aria-label="Username" aria-describedby="basic-addon1" />
            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                 </svg>
                }
            </span>            
            </div>
            <div class="d-grid gap-2 col-12 mx-auto">
            <button type="button" onClick={loginUser} class="btn btn-outline-primary">Login</button>
            </div>
            <br/>
            <p className="no-account">Don't have an account yet? <Link to="/signup" style={{ color: 'blue', cursor: 'pointer' }}>Signup</Link></p>
            </div>
            
        </div>
    );
            }
};

export default Login;