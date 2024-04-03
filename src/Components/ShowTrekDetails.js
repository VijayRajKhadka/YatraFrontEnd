import React, { useState, useEffect } from "react";
import "./Css/ShowTrekDetails.css";
import { BASE_URL } from "./Constants";
import GenerateStar from './ReviewStar';
import ImageSlider from "./ImageSlider";
import UserProfile from './Assets/user.png';
import UserInfo from './UserInfo';

function ShowTrekDetails() {
    const [treks, setTreks] = useState([]);
    const [selectedTrek, setSelectedTrek] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTrekDetails, setSelectedTrekDetails] = useState('');
    const [selectedTrekReview, setSelectedTrekReview] = useState('');
    const [showReviewBox, setShowReviewBox] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [review, setReview]=useState("");

    const [showTrek, setShowTrek] = useState(false);
    useEffect(() => {
        fetchTrekData();
    }, []);

    const fetchTrekData = () => {
        setIsLoading(true);
        fetch(BASE_URL + `trek?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success && data.data && data.data.data) {
                    setTreks(data.data.data);
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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        fetchTrekData();
    };

    const handleClick = (trek) => {
        setSelectedTrek(trek);
        fetch(BASE_URL+`trekDetails?trek=${trek.trek_id}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success && data.data) {
                    setSelectedTrekDetails(data.data);
                    setShowTrek(true);
                } else {
                    console.error('Error: Unexpected data format');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching trek details: ', error);
                setIsLoading(false);
            });

            fetch(BASE_URL+`trekReview?trek=${trek.trek_id}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.success && data.data) {
                    setSelectedTrekReview(data.data);
                } else {
                    console.error('Error: Unexpected data format');
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching trek details: ', error);
                setIsLoading(false);
            });
    };

    const postReview = async () => {
        try {
            const userData = await UserInfo();
            if (userData) {
                const formData = new FormData();
                formData.append('user_id', userData.id);
                formData.append('trek_id', selectedTrekDetails.trek_id);
                formData.append('review', review);
                
                fetch(BASE_URL + "addTrekFeedback", {
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
    return (
        <div>
            <div>
            <br/>

            {showTrek && (
            <div>
                <div className="overlay"></div>
                <div className="choosen-container">
                <div className="close-icon" onClick={() => setShowTrek(false)}>
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
                
                    <ImageSlider type="trek" imagePath={selectedTrekDetails.trek_image.map(image => image.trek_image_path)} />


                    <div className="information">
                    <h2>{selectedTrekDetails.name.toUpperCase()}</h2>
                    <GenerateStar rating={selectedTrek.avg_rating} /><p> { selectedTrek.avg_rating.toFixed(2)}</p>

                    <p>{selectedTrekDetails.description}</p>
                    <hr/>
                    <a className="map-image" target="_blank" href={selectedTrekDetails.map_url}>
    <div style={{position: 'relative', marginRight: "200px"}}>
        <img src={selectedTrekDetails.map_url} style={{width: '300px', height: '350px', position: 'absolute', right: '-120px', top: '0'}} />
    </div>
</a>

                    <p style={{fontWeight:"bold"}}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pin-angle" viewBox="0 0 16 16">
                    <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146m.122 2.112v-.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a5 5 0 0 0-.288-.076 5 5 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a5 5 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034q.172.002.343-.04L9.927 2.028q-.042.172-.04.343a1.8 1.8 0 0 0 .062.46z"/>
                    </svg> {selectedTrekDetails.location.includes(',Nepal') ? selectedTrekDetails.location : selectedTrekDetails.location + ', Nepal'}</p>
                    
                    <p style={{fontWeight:"bold"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
                    <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0"/>
                    <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1m0 5.586 7 7L13.586 9l-7-7H2z"/>
                    </svg> {selectedTrekDetails.category}</p>
                    
                    <p style={{fontWeight:"bold"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-alt" viewBox="0 0 16 16">
                    <path d="M1 13.5a.5.5 0 0 0 .5.5h3.797a.5.5 0 0 0 .439-.26L11 3h3.5a.5.5 0 0 0 0-1h-3.797a.5.5 0 0 0-.439.26L5 13H1.5a.5.5 0 0 0-.5.5m10 0a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5"/>
                    </svg> {selectedTrekDetails.altitude.includes('m') ? selectedTrekDetails.altitude : selectedTrekDetails.altitude + 'm'}</p>
                    
                    
                    
                    <p style={{fontWeight:"bold"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-speedometer2" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                    <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
                    </svg> {selectedTrekDetails.difficulty}</p>

                    <p style={{fontWeight:"bold"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-calendar-date" viewBox="0 0 16 16">
                    <path d="M6.445 11.688V6.354h-.633A13 13 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23"/>
                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg> {selectedTrekDetails.no_of_days.includes('days')?selectedTrekDetails.no_of_days: selectedTrekDetails.no_of_days +' days'}</p>

                    <p style={{fontWeight:"bold", color:"red"}}> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-telephone-x" viewBox="0 0 16 16">
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    <path fill-rule="evenodd" d="M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708"/>
                    </svg> Emergency No: {selectedTrekDetails.emergency_no}</p>
                    
                    <p style={{fontWeight:"bold", color:"green"}}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-exchange" viewBox="0 0 16 16">
                    <path d="M0 5a5 5 0 0 0 4.027 4.905 6.5 6.5 0 0 1 .544-2.073C3.695 7.536 3.132 6.864 3 5.91h-.5v-.426h.466V5.05q-.001-.07.004-.135H2.5v-.427h.511C3.236 3.24 4.213 2.5 5.681 2.5c.316 0 .59.031.819.085v.733a3.5 3.5 0 0 0-.815-.082c-.919 0-1.538.466-1.734 1.252h1.917v.427h-1.98q-.004.07-.003.147v.422h1.983v.427H3.93c.118.602.468 1.03 1.005 1.229a6.5 6.5 0 0 1 4.97-3.113A5.002 5.002 0 0 0 0 5m16 5.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-7.75 1.322c.069.835.746 1.485 1.964 1.562V14h.54v-.62c1.259-.086 1.996-.74 1.996-1.69 0-.865-.563-1.31-1.57-1.54l-.426-.1V8.374c.54.06.884.347.966.745h.948c-.07-.804-.779-1.433-1.914-1.502V7h-.54v.629c-1.076.103-1.808.732-1.808 1.622 0 .787.544 1.288 1.45 1.493l.358.085v1.78c-.554-.08-.92-.376-1.003-.787zm1.96-1.895c-.532-.12-.82-.364-.82-.732 0-.41.311-.719.824-.809v1.54h-.005zm.622 1.044c.645.145.943.38.943.796 0 .474-.37.8-1.02.86v-1.674z"/>
                    </svg> NRS. {selectedTrekDetails.budgetRange}</p>

                    </div>
                    <br/>
                    <hr/>
                    <div className="review-container">
                    <h2 style={{float:"left"}}>Reviews</h2> 
                            <button  style={{float:"right"}} type="button" onClick={() => setShowReviewBox(true)} class="btn btn-outline-info">Write a Review <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                            </svg></button>
                        
                            <br/><br/>
                            {showReviewBox && (
                                
                                <div>
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
                                    <br/><br/>
                                </div>
                                
                            )}
                            <div><hr/>
                            {selectedTrekReview && selectedTrekReview.data && selectedTrekReview.data.length > 0 ? (
                            selectedTrekReview.data.map((review, index) => (
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
                                    <p>No reviews, Be First One !</p>
                                </div>
                            </div>
                        )}



                        </div>
            
                        </div>
                    
                   
                        
                    

                    

                    
                </div>
            </div>
        )}

            <div className="search-box">
            <div class="input-group mb-3">
                
                <input type="text" class="form-control" value={searchTerm} onChange={handleSearchChange} aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="Search..."/>
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg></span>
                </div>
            </div>
            </div>
                <br/>
            </div>
            {isLoading ? (
                <div className="loader-content">
                    <div className="loader-spin"></div>
                </div>
            ) : (
                <div className="row" style={{ margin: "5px" }}>
                    {treks.map((trek, index) => (
                        <div key={trek.trek_id} className="col-md-4 mb-4">
                            <div className="card" onClick={() => handleClick(trek)}>
                                <img src={`https://vijayrajkhadka.com.np/storage/app/public/${trek.trek_image[0].trek_image_name}`} className="card-img-top" alt="Trek1" />
                                <div className="card-body">
                                    <h5 className="card-title">{trek.name}</h5>
                                    <p>{trek.location}, Nepal</p>
                                    <p><strong>Category:</strong> {trek.category}</p>
                                    <p><strong>Rating:</strong> <GenerateStar rating={trek.avg_rating} /> { trek.avg_rating.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ShowTrekDetails;
