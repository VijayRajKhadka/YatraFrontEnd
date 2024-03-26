import React, { useState } from "react";
import "./Css/UserDashboard.css";
import Trek1 from "./Assets/trek3.jpg";
import AddTrekForm from "./AddTrekForm";

function TrekDash(props) {
  const [showAddForm, setShowAddForm] = useState(false);

  const showTrekForm = () => {
    setShowAddForm(true);
    
  };
  const hideTrekForm = () => {
    setShowAddForm(false);
  };
  return (
    <div>
      {showAddForm ? (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
            onClick={hideTrekForm}
            className="back-button"
            style={{float:"left"}}
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg><h1 style={{textAlign:"center"}}>Lets, Start Adding Your Journey To Yatra</h1>
          
        
        
          <AddTrekForm/>
        </div>
       
      ) : (
        <div>
          <h1 style={{ fontSize: "21px", fontWeight: "600" }}>
            Welcome Back, {props.name ? props.name.split(" ")[0] : "Loading..."}
          </h1>
          <p style={{ marginLeft: "40px", padding: "10px", fontSize: "20px" }}>
            Explore Trek...
          </p>
          <div className="box1">
            <img src={Trek1} className="trek-img" alt="Trek1"></img>
            <p className="box1__description">
              <h2 style={{ fontWeight: "bold" }}>YATRA TREK</h2>Yatra! provides
              platform to <br />
              showcase your new findings.
              <br />
              be first to add a new TREK Journey.
              <br />
              <br />
              <button className="add-trek" onClick={showTrekForm}>
                ADD NEW TREK
              </button>
            </p>
          </div>
          <br />
          <p style={{ marginLeft: "40px", padding: "10px", fontSize: "20px" }}>
            Watch Latest Content...
          </p>
          <div className="boxes-container">
            <div className="box2"></div>
            <div className="box3">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/EEvIG8KTAh8?autoplay=1&mute=1"
                allow="autoplay"
                title="YouTube Video"
              ></iframe>
            </div>
          </div>
          <br />
        </div>
      )}
    </div>
  );
}

export default TrekDash;
