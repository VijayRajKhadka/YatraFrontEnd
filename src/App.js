import './App.css';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Home from './Components/Pages/Home';
import UserDashboard from './Components/Pages/UserDashboard';
import RestaurantEvents from './Components/Pages/RestaurantEvents';
import Settings from './Components/Pages/Settings';

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
      <Route path='/restaurantEvents' element={authenticated?<RestaurantEvents/>:<Login/>}/>
      <Route path='/settings' element={authenticated?<Settings/>:<Login/>}/>
      <Route path='/userDashboard' element={authenticated?<UserDashboard/>:<Login/>}/>
    </Routes>
  )
};


export default App;
