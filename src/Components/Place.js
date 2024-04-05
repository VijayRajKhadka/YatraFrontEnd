import React, { useState } from "react";
import "./Css/UserDashboard.css";
import Trek1 from "./Assets/bkt2.png";
import AddPlaceForm from "./AddPlaceForm";
import ShowPlaceDetails from "./ShowPlaceDetails";


function PlaceDash() {
  const [displayMode, setDisplayMode] = useState("dashboard");

  const showPlaceForm = () => {
    setDisplayMode("addForm");
  };

  const showPlaceDetails = () => {
    setDisplayMode("trekDetails");
  };

  const hidePlaceForm = () => {
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
            onClick={hidePlaceForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Explore All Available Places
          </h1>
          <ShowPlaceDetails/>
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
            onClick={hidePlaceForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Let's Start Adding Place You Want!
          </h1>
          <AddPlaceForm />
        </div>
      )}
      

      {displayMode === "dashboard" && (
        <div>
          
          <p
            style={{
              marginLeft: "10px",
              padding: "10px",
              float: "left",
              fontSize: "20px",
            }}
          >
            Explore Places...
          </p>
          <a onClick={showPlaceDetails}>
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
              <h2 style={{ fontWeight: "bold" }}>YATRA PLACE</h2>
              Yatra! provides you to <br />
              showcase your new findings.
              <br />
              be the first to add a new Place.
              <br />
              <br />
              <button className="add-trek" onClick={showPlaceForm}>
                ADD NEW PLACE
              </button>
            </p>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default PlaceDash;
