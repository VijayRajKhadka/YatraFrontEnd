import './App.css';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Home from './Components/Pages/Home';
import UserDashboard from './Components/Pages/UserDashboard';
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Routes ,Route , Navigate} from 'react-router-dom';

const App = () => {
  const authenticated = Cookies.get("token");
 
  return (
    <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/userDashboard' element={authenticated?<UserDashboard/>:<Login/>}/>
    </Routes>
  )
};


export default App;
