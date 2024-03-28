import React, { useState, useEffect } from "react";
import "./Css/ShowTrekDetails.css";
import { BASE_URL } from "./Constants"; 
import Trek1 from "./Assets/mountain.jpg";

function ShowTrekDetails(){
    const [treks, setTreks] = useState([]);
    const [selectedTrek, setSelectedTrek] = useState(null);

    useEffect(() => {
        fetch(BASE_URL + "trek")
            .then(response => response.json())
            .then(data => setTreks(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleClick = (trek) => {
        setSelectedTrek(trek);
    };

    return(
        <div>
            {selectedTrek && (
                <div className="expanded-details">
                    
                    <div className="row">
                        <div className="col-md-6">
                            {selectedTrek.trek_image.map((image, index) => (
                                <img key={index} src={`http://127.0.0.1:8000/storage/${image.trek_image_name}`} className="expanded-image" alt={`Trek Image ${index}`} />
                            ))}
                        </div>
                        <div className="col-md-6">
                            <h2>{selectedTrek.name}</h2>
                            <p>{selectedTrek.description}</p>
                            <p><strong>Category:</strong> {selectedTrek.category}</p>
                            <p><strong>Altitude:</strong> {selectedTrek.altitude}</p>
                            <p><strong>Difficulty:</strong> {selectedTrek.difficulty}</p>
                            <p><strong>No of days:</strong> {selectedTrek.no_of_days}</p>
                            <p><strong>Emergency Number:</strong> {selectedTrek.emergency_no}</p>
                            <p><strong>Budget Range:</strong> {selectedTrek.budgetRange}</p>
                        </div>
                    </div>
                </div>
            )}
            <div className="row" style={{marginLeft:"10px"}}>
                {treks.map((trek, index) => (
                    <div key={trek.trek_id} className="col-md-4 mb-4">
                        
                        <div className="card" onClick={() => handleClick(trek)}>
                        <img src={`http://127.0.0.1:8000/storage/${trek.trek_image[0].trek_image_name}`} className="card-img-top" alt="Trek1" />

                            <div className="card-body">
                                <h5 className="card-title">{trek.name}</h5>
                                <p><strong>Trip Duration:</strong> {trek.no_of_days} days</p>
                                <p><strong>Budget Range:</strong> {trek.budgetRange}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default ShowTrekDetails;
