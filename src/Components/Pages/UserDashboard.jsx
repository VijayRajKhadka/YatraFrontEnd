import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants";
import Sidebar from "../sidebar";
import TrekDash from "../Trek.js";
import "../Css/UserDashboard.css";
import PlaceDash from "../Place.js";
import RestaurantDash from "../Restaurant.js";

const UserDash = () => {
  const [userData, setUserData] = useState(null);
  const token = Cookies.get("token");
  const [displayDash, setDisplayMode] = useState("trek");

  const showPlace=()=>{
    setDisplayMode('place');
  }

  const showTrek=()=>{
    setDisplayMode('trek');
  }

  const showRestaurant=()=>{
    setDisplayMode('restaurant');
  }


  return (
    <div className="body-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="tab-navbar">
      <ul class="nav nav-underline">
        <li class="nav-item">
          <a class="nav-link " style={{color:'black'}} aria-current="page" onClick={showTrek}>Trek</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={showPlace}>Places</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={showRestaurant}>Restaurant</a>
        </li>
      </ul>
      </div>
        <div className="content">
        {displayDash === "trek" && (
          <div>
          <TrekDash/>
          </div>
        )}
        {displayDash === "place" && (
          <div>
          <PlaceDash/>
          </div>
        )}
        {displayDash ==='restaurant' &&(
          <div>
          <RestaurantDash/>
          </div>
        )}
        </div>
    </div>
    </div>
  );
};

export default UserDash;
