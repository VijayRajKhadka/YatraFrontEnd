import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants";
import Sidebar from "../sidebar";
import TrekDash from "../Trek.js";
import "../Css/UserDashboard.css";
import PlaceDash from "../Place.js";

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
  useEffect(() => {
   
      fetch(BASE_URL + "user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  );

  return (
    <div className="body-container">
      <div className="sidebar">
        <Sidebar
          name={userData ? userData.name : "Loading..."}
          image={
            userData
              ? userData.profile_url
              : null
          }
          email={userData ? userData.email : "Loading..."}
        />
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
        </div>
    </div>
    </div>
  );
};

export default UserDash;
