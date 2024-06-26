import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import "../Css/UserDashboard.css";
import UserInfo from '../UserInfo';
import RestInfo from '../VerifyRestaurant';
import { BASE_URL } from "../Constants";
import Notify from "../SendNotification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


const RestaurantEvents = () => {
    const [userData, setUserData] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState(null);
    const [isChecked, setIsChecked] = useState(false); 
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [errors, setErrors] = useState(null);
    const [image_errors, setImageErrors] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserInfo();
                setUserData(userData);
                const restaurantData = await RestInfo(userData.id);
                setRestaurants(restaurantData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked); 
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const startTimeWith6Hours = startTime ? new Date(startTime).getTime() + (6 * 60 * 60 * 1000) : null;
        const endTimeWith6Hours = endTime ? new Date(endTime).getTime() + (6 * 60 * 60 * 1000) : null;

        const formattedStartTime = startTimeWith6Hours ? new Date(startTimeWith6Hours).toISOString().slice(0, 19).replace("T", " ") : '';
        const formattedEndTime = endTimeWith6Hours ? new Date(endTimeWith6Hours).toISOString().slice(0, 19).replace("T", " ") : '';


        const formData = new FormData();
        formData.append('name', selectedRestaurant.name);
        formData.append('location', selectedRestaurant.location);
        formData.append('open_time', selectedRestaurant.opentime);
        formData.append('restaurant_id', selectedRestaurant.id);
        formData.append('start_time', formattedStartTime);
        formData.append('end_time', formattedEndTime);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('event_image_path',file);
        
        fetch(BASE_URL + "addRestaurantEvent", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
           }else{
            if(isChecked){
                Notify(title, body);
            }
                setSuccessMessage('Event ' + title +' added successfully');

                setErrors('');
                setFile(null);
                setShowForm(false);
                setTitle('');
                setSelectedRestaurant(null);
                setBody('');
                setStartTime('');
                setEndTime('');

           }
           
        })
        .catch(error => {
            if (error && error.response && error.response.status === 413) {
                setImageErrors('Content Too Large, Try Uploading Small Images');
            } else {
                setImageErrors('Error:',error);
            }
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <div className="body-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="main-content" style={{ maxHeight: "calc(100vh)", overflowY: "auto" }}>
                <h2 style={{ padding: "20px" }}>Restaurant Events</h2>
            {isLoading && (
                <div className="loader-container">
                    
                    <div className="loader"></div>
                    <div><p>Posting Events</p></div>
                </div>
            )}
        
            {success && (
                <div className="success-container">
                    {success}
                </div>
            )
            }
            {errors && (
                <div className="error-container">
                <div className="invalid-error" role="alert">
                {Object.keys(errors).map(key => (
                    errors[key].map((message, index) => (
                        <div key={key + index}>{message}</div>
                    ))
                ))}
            </div>
            </div>
            )}
                {showForm && (
                    <div style={{padding:"50px"}}>
                        <h3>Let's Add Your Event</h3>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                Selected Restaurant: 
                                <h4>{selectedRestaurant.name}</h4>

                            </div>
                            <div className="mb-3">
                                <label htmlFor="titleInput" className="form-label">Title:</label>
                                <input type="text" className="form-control" id="titleInput" placeholder="Title for Event" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="titleInput" className="form-label">Body/Description:</label>
                                <input type="text" className="form-control" id="titleInput" placeholder="Write short and Sweet " value={body} onChange={(e) => setBody(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="fileInput" className="form-label">Choose Event Image:</label>
                                <input type="file" className="form-control" id="fileInput" onChange={(e) => { 
                                const file = e.target.files[0]; 
                                    if (file) {    
                                        setFile(file); 
                                    }
                            
                            }}   />
                            </div>
                            
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="startDateTime" className="form-label">Event Start Time:</label>
                                        <br/>
                                        <DatePicker
                                            selected={startTime}
                                            onChange={(date) => setStartTime(date)}
                                            showTimeSelect
                                            timeFormat="h:mm aa"
                                            timeIntervals={60}
                                            timeCaption="Time"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            minDate={new Date()}
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="endDateTime" className="form-label">Event End Time:</label>
                                    <br/>
                                    <DatePicker
                                            selected={endTime}
                                            onChange={(date) => setEndTime(date)}
                                            showTimeSelect
                                            timeFormat="h:mm aa"
                                            timeIntervals={60}
                                            timeCaption="Time"
                                            dateFormat="MMMM d, yyyy h:mm aa"
                                            minDate={new Date()}
                                            className="form-control"
                                        />
                                    </div>

                                </div>
                            </div>

                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    checked={isChecked} 
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">Send Notification</label>
                            </div>

                            <button type="submit" className="btn btn-primary">Add Event</button>
                        </form>
                    </div>
                )}
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Affordability</th>
                            <th className="p-3">Open Time</th>
                            <th className="p-3">Add Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map(restaurant => (
                            <tr key={restaurant.restaurant_id}>
                                <td className="p-3">{restaurant.name}</td>
                                <td className="p-3">{restaurant.location}</td>
                                <td className="p-3">{restaurant.category}</td>
                                <td className="p-3">{restaurant.affordability}</td>
                                <td className="p-3">{restaurant.open_time}</td>
                                <td className="p-3">
                                    <button className="btn btn-primary" onClick={() => { setShowForm(true); setSelectedRestaurant({ name: restaurant.name, id: restaurant.restaurant_id, location: restaurant.location,opentime: restaurant.open_time }); }}>Add Event</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RestaurantEvents;
