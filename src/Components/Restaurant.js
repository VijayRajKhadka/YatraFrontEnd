import React, { useState } from "react";
import "./Css/UserDashboard.css";
import Food1 from "./Assets/localfood2.jpg";
import AddRestaurantForm from "./AddRestaurantForm";
import ShowRestaurantDetails from "./ShowRestaurantDetails";


function RestaurantDash() {
  const [displayMode, setDisplayMode] = useState("dashboard");

  const showRestaurantForm = () => {
    setDisplayMode("addForm");
  };

  const showRestaurantDetails = () => {
    setDisplayMode("RestaurantDetails");
  };

  const hideRestaurantForm = () => {
    setDisplayMode("dashboard");
  };

  return (
    <div>
      {displayMode==="RestaurantDetails" &&(
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={hideRestaurantForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Explore All Available Restaurant
          </h1>
          <ShowRestaurantDetails/>
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
            onClick={hideRestaurantForm}
            className="back-button"
            style={{ float: "left" }}
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
          <h1 style={{ textAlign: "center" }}>
            Let's Start Growing by Adding A Restaurant.
          </h1>
          <AddRestaurantForm />
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
            Explore Restaurant...
          </p>
          <a onClick={showRestaurantDetails}>
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
            <img src={Food1} className="trek-img" alt="Trek1"></img>
            <p className="box1__description">
              <h2 style={{ fontWeight: "bold" }}>YATRA FOOD</h2>
              Yatra! provides you to <br />
              platform to grow you Business.
              <br />
              be first one to add your Restaurant.
              <br />
              <br />
              <button className="add-trek" onClick={showRestaurantForm}>
                ADD NEW RESTAURANT
              </button>
            </p>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default RestaurantDash;
