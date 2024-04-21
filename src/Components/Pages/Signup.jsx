
import React from "react";
import '../Css/Signup.css'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import phone_icon from '../Assets/phone.png'
import user_icon from '../Assets/user.png'
import {useState} from 'react';
import { BASE_URL } from "../Constants";

const Signup = () => {

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [contact, setContact]=useState("");
    const [password, setPassword]=useState("");
    const [confirm_password, setConfirmPassword]=useState("");
    const [profile, setProfile]=useState("");
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


   function registerUser() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('contact', contact);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    formData.append('profile', profile); 
    
    fetch(BASE_URL + "register", {
        method: "POST",
        body: formData
    })
    .then(result => result.json())
    .then(responseData => {
        if (responseData.success === false) {
            setErrors(responseData.message);
        } else {
            window.location.href = '/login';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    })
    .finally(() => {
        setIsLoading(false);
    });
}

    return(
        <div className="container">
    <div>
        <img src={logo} className="logo-img"/>
        <div className="login-header">
            <p>Register</p>
        </div>
        {errors && (
    <div className="invalid-error" role="alert">
        {Object.keys(errors).map(key => (
            errors[key].map((message, index) => (
                <div key={key + index}>{message}</div>
            ))
        ))}
    </div>
)}
        {isLoading && (
            <div className="loader-container">
                <div className="loader"></div>
            </div>
        )}
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><img src={email_icon} className="login-icon"/></span>
            <input type="text" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="email address" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><img src={user_icon} className="login-icon"/></span>
            <input type="text" className="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="user name" aria-label="Username" aria-describedby="basic-addon1"/>
            <span className="input-group-text" id="basic-addon1"><img src={phone_icon} className="login-icon"/></span>
            <input type="text" className="form-control" value={contact} onChange={(e)=>{setContact(e.target.value)}} placeholder="contact" aria-label="Username" aria-describedby="basic-addon1"/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><img src={password_icon} className="login-icon"/></span>
            <input type={showPassword ? "text" : "password"} className="form-control"  value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" aria-label="Username" aria-describedby="basic-addon1"/>
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

        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"><img src={password_icon} className="login-icon"/></span>
            <input type={showPassword ? "text" : "password"} className="form-control" value={confirm_password} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="re-typepassword" aria-label="Username" aria-describedby="basic-addon1"/>
        
        </div>
        <input 
    class="form-control" 
    type="file" 
    id="formFile" 
    onChange={(e) => { 
        const file = e.target.files[0]; 
        if (file) {    
            setProfile(file);     
        }
    }} 
/>
<p id="file-name"></p>


         <div className="d-grid gap-2 col-12 mx-auto">
            <button type="button" onClick={registerUser} className="btn btn-outline-primary">Register</button>
        </div>
        <br/>
        <p className="no-account">
            view our{" "}
            <a href="https://www.termsfeed.com/live/47e72c29-c880-4a57-82ee-a954e4658f27" target="_blank" rel="noopener noreferrer" style={{ color: "blue", cursor: "pointer",textDecoration: "italic" }}>
                Privary policy
            </a>
            </p>
        <p className="no-account">already have account? <Link to="/login" style={{ color: 'blue', cursor: 'pointer' }}>Login</Link></p>
    </div>
</div>

    );
};

export default Signup;