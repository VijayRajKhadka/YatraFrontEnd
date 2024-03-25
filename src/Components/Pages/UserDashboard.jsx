import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { BASE_URL } from "../Constants";
import Sidebar from '../sidebar';
import '../Css/UserDashboard.css';
import Trek1 from '../Assets/trek3.jpg'

const UserDash = () => {
    const [userData, setUserData] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
        } else {
            fetch(BASE_URL + "user", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [token]);

    return (
        <div className='body-container'>
            <div className='sidebar'>          
                <Sidebar 
                    name={userData ? userData.name : "Loading..."}
                    image={userData ? 'http://127.0.0.1:8000/storage/' + userData.profile : null}
                    email={userData ? userData.email : "Loading..."}
                /> 
            </div>
            <div className='main-content'>
                
                
                <div>
                <h1>Welcome Back, {userData ? userData.name.split(' ')[0] : "Loading..."}</h1>

                </div>
                <div className='content'>
                    <nav class="nav">
                        <a class="nav-link active" href="#">Trek</a>
                        <a class="nav-link" href="#">Restaurant</a>
                        <a class="nav-link" href="#">Place</a>
                    </nav>
                    <br/>
            
                    <div className='box1'>
                        <img src={Trek1} className='trek-img'></img>
                        <p class="box1__description"><h2 style={{fontWeight:"bold"}}>YATRA TREK</h2>Yatra! provides platform to <br/>
                        showcase your new findings.<br/>
                        be first to add a new TREK Journey.
                        <br/>
                        <br></br>
                        <button className='add-trek'>ADD NEW TREK</button></p>
                    </div>
                    
                    <br/>
                    <div className='boxes-container'>
                       <div className='box2'></div>
                         <div className='box3'>
                           <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EEvIG8KTAh8?autoplay=1&mute=1" allow="autoplay" title="YouTube Video"></iframe>
                        </div>
                   </div>

                    <br/>
                    
                </div>   
            </div>
        </div>
    );
}

export default UserDash;
