import React, { useState } from "react";
import "./Css/UserDashboard.css";
import Trek1 from "./Assets/mountain.jpg";
import Trek2 from "./Assets/trek.jpg";
import TavelAgency from "./Assets/travelagency.jpg";

import AddTrekForm from "./AddTrekForm";
import ShowTrekDetails from "./ShowTrekDetails";
import ShowWatchContentDetails from "./WatchContent";


function TrekDash(props) {
  const [displayMode, setDisplayMode] = useState("dashboard");

  const showAddForm = () => {
    setDisplayMode("addForm");
  };

  const showTrekDetails = () => {
    setDisplayMode("trekDetails");
  };

  const showWatchDetails = () => {
    setDisplayMode("watchContent");
  };

  const hideTrekForm = () => {
    setDisplayMode("dashboard");
  };

  return (
    <div>
      {displayMode==="trekDetails" &&(
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={hideTrekForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Explore All Available Treks
          </h1>
          <ShowTrekDetails/>
        </div>
      )}
      {displayMode === "addForm" && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={hideTrekForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Let's Start Adding Your Journey To Yatra
          </h1>
          <AddTrekForm />
        </div>
      )}
      {displayMode === "watchContent" && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={hideTrekForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Watch Latest Content
          </h1>
          <ShowWatchContentDetails/>
        </div>
      )}


      {displayMode === "dashboard" && (
        <div>
          <h1 style={{ fontSize: "21px", fontWeight: "600" }}>
            Welcome Back, {props.name ? props.name.split(" ")[0] : "Loading..."}
          </h1>
          <p
            style={{
              marginLeft: "10px",
              padding: "10px",
              float: "left",
              fontSize: "20px",
            }}
          >
            Explore Trek...
          </p>
          <a onClick={showTrekDetails}>
            <p
              style={{
                marginRight: "20px",
                padding: "10px",
                float: "right",
                fontSize: "18px",
                color: "blue",
              }}
            >
              Explore
            </p>
          </a>

          <div className="box1">
            <img src={Trek1} className="trek-img" alt="Trek1"></img>
            <p className="box1__description">
              <h2 style={{ fontWeight: "bold" }}>YATRA TREK</h2>
              Yatra! provides platform to <br />
              showcase your new findings.
              <br />
              be the first to add a new TREK Journey.
              <br />
              <br />
              <button className="add-trek" onClick={showAddForm}>
                ADD NEW TREK
              </button>
            </p>
          </div>
          <br/>
          <p
            style={{
              marginLeft: "20px",
              paddingTop: "30px",
              fontSize: "20px",
              float:"left"
            }}
          >
            Watch Latest Content...
          </p>
          
          <a onClick={showWatchDetails}><p style={{marginRight: "20px",
                padding: "10px",
                float: "right",
                fontSize: "18px",
                color: "blue",}}>
            Watch
          </p></a>
          <br/>
          <br/>
          <div className="watch-content">
          <div class="polaroid rotate_right">
            <img src={Trek2} alt="Pulpit rock" width="260" height="213" />
            <p class="caption">
              Way To Annapurna Base Camp, Enjoy Every moment with
            </p>
          </div>
          <div className="boxes-container">
            <div className="box3">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/EEvIG8KTAh8?autoplay=1&mute=1"
                allow="autoplay"
                title="YouTube Video"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          </div>
          <br />
          <br />
          <p style={{ marginLeft: "20px", fontSize: "20px" }}>
            Choose your Travel Partner...
          </p>
          <div className="box1">
            <img src={TavelAgency} className="trek-img" alt="Trek1"></img>
            <p className="box1__description">
              <h2 style={{ fontWeight: "bold" }}>YATRA TRAVEL</h2> With Yatra,
              <br /> Grow Your Business <br />
              Register your Travel Agency Now,
              <br />
              <br />
              <button className="add-trek" onClick={showTrekDetails}>
                REGISTER AGENCY
              </button>
            </p>
          </div>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}

export default TrekDash;
