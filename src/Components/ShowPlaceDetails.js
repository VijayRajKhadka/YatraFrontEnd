import React, { useState, useEffect } from "react";
import "./Css/ShowTrekDetails.css";
import { BASE_URL } from "./Constants"; 
import ImageSlider from "./ImageSlider";
import UserProfile from './Assets/user.png';
import GenerateStar from './ReviewStar';
import UserInfo from './UserInfo';
function ShowPlaceDetails(){
    const [places, setPlaces] = useState([]); 
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedPlaceDetails, setSelectedPlaceDetails] = useState('');
    const [selectedPlaceReview, setSelectedPlaceReview] = useState('');
    const [showPlace, setShowPlace] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showReviewBox, setShowReviewBox] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [review, setReview]=useState("");


    
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

    const  handleClick = (place) => {
        setSelectedPlace(place);
        fetch(BASE_URL+`placeDetails?place=${place.place_id}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success && data.data) {
                    setSelectedPlaceDetails(data.data);
                    setShowPlace(true);
                } else {
                    console.error('Error: Unexpected data format');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching place details: ', error);
                setIsLoading(false);
            });

            fetch(BASE_URL+`placeReview?place=${place.place_id}`)
            .then(response => response.json())
            .then(data => {
                console.log(place.place_id);
                if (data && data.success && data.data) {
                    setSelectedPlaceReview(data.data);
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


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        searchPlaceData();
    };

    const postReview = async () => {
        try {
            const userData = await UserInfo();
            if (userData) {
                const formData = new FormData();
                formData.append('user_id', userData.id);
                formData.append('place_id', selectedPlaceDetails.place_id);
                formData.append('review', review);
                
                fetch(BASE_URL + "addPlaceFeedback", {
                    method: "POST",
                    body: formData
                })
                .then(result => result.json())
                .then(responseData => {
                   if(responseData.success===false){
                    setErrors(responseData.message);
                   }
                   else{
                    setSuccess('Thank You For You Review');
                    setErrors(null);
                    setShowReviewBox(false)
                   }
                   
                });
                
            } else {
                console.warn('User data is null');
            }
        } catch (error) {
            console.error('Error in postReview:', error);
        }
    }

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
                
                    <ImageSlider type="trek" imagePath={selectedPlaceDetails.place_image.map(image => image.place_image_path)} />


                    <div className="information">
                    <h2>{selectedPlaceDetails.name.toUpperCase()}</h2>
                    <GenerateStar rating={selectedPlace.avg_rating} /><p> { selectedPlace.avg_rating.toFixed(2)}</p>

                    <p>{selectedPlaceDetails.description}</p>
                    <hr/>
                    <p style={{fontWeight:"bold"}}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
                    </svg> {selectedPlaceDetails.location}</p>
                    <p style={{fontWeight:"bold"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
                    <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/>
                    <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/>
                    </svg> {selectedPlaceDetails.category}</p>
                    <p style={{fontWeight:"bold"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
                    </svg> {selectedPlaceDetails.open_time}</p>
                    <hr/>
                    <p style={{fontWeight:"bold"}}>How to get there?</p>
                    <p >{selectedPlaceDetails.get_there}</p>
                    
                    </div>
                    <br/>
                    <hr/>
                    <div className="review-container">
                            <h2 style={{float:"left"}}>Reviews</h2> 
                            <button  style={{float:"right"}} type="button" onClick={() => setShowReviewBox(true)} class="btn btn-outline-info">Write a Review <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg></button>

                            {showReviewBox && (
                                
                                <div>
                                    <br/>
                                    <br/>
                                    {errors && (
                                        <div className="error-container">
                                        <div className="invalid-error" role="alert">
                                        {Object.keys(errors).map(key => (
                                            errors[key].map((message, index) => (
                                                <div key={key + index}>{message}</div>
                                            ))
                                        ))}
                                    {success && (
                                        <div style={{backgroundColor:"green"}}>
                                            <p>{success}</p>
                                        </div>
                                    )}
                                    </div>
                                    </div>
                                    )}
                                    <div class="mb-3">
                                    <textarea value={review} onChange={(e)=>{setReview(e.target.value)}}  class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Write a review here..."></textarea>
                                    </div>
                                    <div>
                                    <button  onClick={() => setShowReviewBox(false)} style={{ float: "right" }} type="button" class="btn btn-outline-danger">
                                        Cancel
                                    </button>
                                    <button  onClick={postReview} style={{ float: "right", marginRight: "20px" }} type="button" class="btn btn-outline-success">
                                        Post Review
                                    </button>
                                    </div>

                                </div>
                            )}
                            <div>
                            <br/>
                                <br/><hr/>
                            {selectedPlaceReview && selectedPlaceReview.data && selectedPlaceReview.data.length > 0 ? (
                            selectedPlaceReview.data.map((review, index) => (
                                <div key={index} className="card mb-3">
                                    <div className="card-body">
                                        <div className="profile-info">
                                            <img src={review.user.profile_url || UserProfile} alt={review.user.name} className="rounded-circle profile-pic" />
                                            <div className="user-info">
                                                <div className="user-meta">
                                                    <p className="user-name" title={review.user.name}>{review.user.name}</p>
                                                    <p className="created-at">{new Date(review.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <p className="review">{review.review}</p> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <p>No reviews available</p>
                                </div>
                            </div>
                        )}
                        </div>
            
                        </div>
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
                                    <h5 className="card-title">{place.name.toUpperCase()}</h5><GenerateStar rating={place.avg_rating} /><p>{ place.avg_rating.toFixed(2)}</p>
                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
                                    </svg> {place.location}</p>
                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
                                    <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/>
                                    <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/>
                                    </svg> {place.category}</p>
                                    
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
