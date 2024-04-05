import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/Sidebar.css";
import logo from "./Assets/logo.png";
import userlogo from "./Assets/user.png";
import TokenLogout from "./Logout";
import UserInfo from './UserInfo';

const Sidebar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await UserInfo();
      setUserData(userData);
    };

    fetchUserData();
  }, []);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} className="sidebar-logo" alt="Logo" />
      </Link>

      <div>
        {userData && userData.profile_url ? (
          <img
            src={userData.profile_url}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <img src={userlogo} alt="Profile" className="profile-image" />
        )}
        <p className="username">{userData ? userData.name : 'Loading...'}</p>
        <p className="email">{userData ? userData.email:'Loading...'}</p>
      </div>

      <ul class="list-group">
        <a href="#" class="nav-link-dash">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
          </svg>{" "}
          &nbsp;&nbsp;Dashboard
        </a>

        <a href="#" class="nav-link-dash">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-gear-wide-connected"
            viewBox="0 0 16 16"
          >
            <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
          </svg>{" "}
          &nbsp;&nbsp;Settings
        </a>

        <a href="#" class="nav-link-dash">
          <TokenLogout />
        </a>
      </ul>
    </div>
  );
};

export default Sidebar;
