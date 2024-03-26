import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BASE_URL } from "../Constants";
import Sidebar from "../sidebar";
import TrekDash from "../Trek.js";
import "../Css/UserDashboard.css";

const UserDash = () => {
  const [userData, setUserData] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else {
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
  }, [token]);

  return (
    <div className="body-container">
      <div className="sidebar">
        <Sidebar
          name={userData ? userData.name : "Loading..."}
          image={
            userData
              ? "http://127.0.0.1:8000/storage/" + userData.profile
              : null
          }
          email={userData ? userData.email : "Loading..."}
        />
      </div>
      <div className="main-content">
        
        <div className="content">
          <TrekDash name={userData? userData.name : "Loading..."}/>
        </div>
      </div>
    </div>
  );
};

export default UserDash;
