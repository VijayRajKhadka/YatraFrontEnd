import React, { useState, useEffect } from "react";
import "./Css/ShowTrekDetails.css";
import { BASE_URL } from "./Constants"; 

function ShowPlaceDetails(){
    const [places, setPlaces] = useState([]); 
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedPlaceDetails, setSelectedPlaceDetails] = useState('');

    const [showPlace, setShowPlace] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        searchPlaceData();
    }, []);

    
    const searchPlaceData = () => {
        setIsLoading(true);
        fetch(BASE_URL + `place?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success && data.data && data.data.data) {
                    setPlaces(data.data.data);
                } else {
                    console.error('Error: Unexpected data format');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setIsLoading(false);
            });
    };

    const handleClick = (place) => {
        setShowPlace(true);
        setSelectedPlace(place);
        fetch(BASE_URL+`placeDetails?place=${selectedPlace.place_id}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success && data.data) {
                    setSelectedPlaceDetails(data.data);
                } else {
                    console.error('Error: Unexpected data format');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching place details: ', error);
                setIsLoading(false);
            });
    };

    const generateStarIcons = (rating) => {
        const stars = [];
        const maxStars = 5;
        for (let i = 0; i < maxStars; i++) {
            if (i < rating) {
                stars.push(<svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>);
            } else {
                stars.push(<i key={i} className="far fa-star"></i>);
            }
        }
        return stars;
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        searchPlaceData();
    };

    return(
        <div>
            <div>
            <br/>
            {showPlace && (
            <div>
                <div className="overlay"></div>
                <div className="choosen-container">
                <div className="close-icon" onClick={() => setShowPlace(false)}>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                    >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                    </svg>
                </div>
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    {selectedPlaceDetails.place_image.map((image, index) => (
                        <li key={index} data-target="#carouselExampleIndicators" data-slide-to={index} className={index === 0 ? "active" : ""}></li>
                    ))}
                </ol>
                <div class="carousel-inner">
                    {selectedPlaceDetails.place_image.map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <img className="d-block w-100" src={image.place_image_path} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>

            {/* Other details */}
            <h2>{selectedPlaceDetails.name}</h2>
            <p>Description: {selectedPlaceDetails.description}</p>
            <p>Location: {selectedPlaceDetails.location}</p>
            <p>Category: {selectedPlaceDetails.category}</p>
            <p>Open Time: {selectedPlaceDetails.open_time}</p>
            {/* Render other details as needed */}
        
                </div>
            </div>
            )}



            <div className="search-box">
            <div className="input-group mb-3">                
                <input type="text" className="form-control" value={searchTerm} onChange={handleSearchChange} aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Search..."/>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-default">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </span>
                </div>
            </div>
            </div>
                <br/>
                <br/>
            </div>
            {isLoading ? (
                <div className="loader-content" ><div className="loader-spin"></div></div>
            ) : (
                <div className="row" style={{ marginLeft: "10px" }}>
                    {places.map((place, index) => (
                        <div key={place.place_id} className="col-md-4 mb-4">
                            <div className="card" onClick={() => handleClick(place)}>
                                <img src={place.place_image[0].place_image_path} className="card-img-top" alt="Place1" />          
                                <div className="card-body">
                                    <h5 className="card-title">{place.name}</h5>
                                    <p><strong>Location:</strong> {place.location}</p>
                                    <p><strong>Category:</strong> {place.category}</p>
                                    <p><strong>Rating:</strong> {generateStarIcons(place.avg_rating)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
}

export default ShowPlaceDetails;
