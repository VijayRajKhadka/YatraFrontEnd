import React, { useState, useEffect } from "react";
import "./Css/ShowTrekDetails.css";
import { BASE_URL } from "./Constants"; 
import "./Css/ShowTrekDetails.css";

function WatchContentDetail(){
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch data from your API
        fetch(BASE_URL+'getWatchContent')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {videos.map(video => (
                <div key={video.content_id} style={{ width: '45%', margin: '10px' }} className="watchContent">
                    <iframe title={`video_${video.content_id}`} width="100%" height="300" src={video.content_url} frameBorder="0" allowFullScreen></iframe>
                </div>
            ))}
        </div>
    );
}

export default WatchContentDetail