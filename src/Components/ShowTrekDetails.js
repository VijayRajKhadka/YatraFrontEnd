import React, { useState, useEffect } from "react";
import "./Css/ShowTrekDetails.css";
import { BASE_URL } from "./Constants";

function ShowTrekDetails() {
    const [treks, setTreks] = useState([]);
    const [selectedTrek, setSelectedTrek] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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
                stars.push(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
              </svg>);
            }
        }
        return stars;
    };

    return (
        <div>
            <div>
            <br/>
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
                <div className="loader-content" ><div className="loader-spin"></div></div>
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
                                    <p><strong>Rating:</strong> {generateStarIcons(trek.avg_rating)} { trek.avg_rating}</p>
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
