import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import "../Css/UserDashboard.css";
import UserInfo from '../UserInfo';
import AgencyInfo from '../VerifyAgency';
import { BASE_URL } from "../Constants";
import Notify from "../SendNotification";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


const RestaurantEvents = () => {
    const [userData, setUserData] = useState(null);
    const [agencies, setAgencies] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedAgency, setSelectedAgency] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState(null);
    const [isChecked, setIsChecked] = useState(false); 
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')
    const [errors, setErrors] = useState(null);
    const [image_errors, setImageErrors] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showGuideForm, setShowGuideForm] = useState(false);
    const [guidefile, setGuideFile] = useState(null);
    const [guideName, setGuideName] = useState('');
    const [guideDesc, setGuideDesc] = useState('');
    const [guideContact, setGuideContact] = useState('');

    
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await UserInfo();
                setUserData(userData);
                const agencyData = await AgencyInfo(userData.id);
                setAgencies(agencyData);
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
        formData.append('name', selectedAgency.name);
        formData.append('location', selectedAgency.location);
        formData.append('email', selectedAgency.email);
        formData.append('contact_no', selectedAgency.contact_no);
        formData.append('agency_id', selectedAgency.id);
        formData.append('start_time', formattedStartTime);
        formData.append('end_time', formattedEndTime);
        formData.append('title', title);
        formData.append('body', body);
        formData.append('event_image_path',file);
        
        fetch(BASE_URL + "addTravelEvent", {
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
                setSelectedAgency(null);
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

    const addGuide = (event) => {
        event.preventDefault();
        setIsLoading(true);
        

        const formData = new FormData();
        formData.append('agency_id', selectedAgency.id);
        formData.append('name', guideName);
        formData.append('contact', guideContact);
        formData.append('profile_url', guidefile);
        formData.append('experience', guideDesc);
        
        fetch(BASE_URL + "addGuide", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
           }else{         
                setSuccessMessage('Guide ' + guideName +' added successfully');

                setErrors('');
                setGuideFile(null);
                setShowGuideForm(false);
                setGuideName('');
                setSelectedAgency(null);
                setGuideContact('');
                setGuideDesc('');

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
                <h2 style={{ padding: "20px" }}>Travel Events</h2>
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
                                Selected Travel Agency: 
                                <h4>{selectedAgency.name}</h4>

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
                {showGuideForm &&(
                    <div style={{padding:"50px"}}>
                    <h3>Let's Add Your Guide</h3>
                    <br/>
                    <form onSubmit={addGuide}>
                        <div className="mb-3">
                            Selected Travel Agency: 
                            <h4>{selectedAgency.name}</h4>

                        </div>
                        <div className="mb-3">
                            <label htmlFor="titleInput" className="form-label">Guide Name:</label>
                            <input type="text" className="form-control" id="titleInput" placeholder="Name of Guide" value={guideName} onChange={(e) => setGuideName(e.target.value)}  required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titleInput" className="form-label">Guide Contact:</label>
                            <input type="text" className="form-control" id="titleInput" placeholder="Email or Phone Number" value={guideContact} onChange={(e) => setGuideContact(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="titleInput" className="form-label">About Guide:</label>
                            <textarea type="text" className="form-control" id="titleInput" placeholder="About Guide Experience and Qualification" value={guideDesc} onChange={(e) => setGuideDesc(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fileInput" className="form-label">Choose Guide Profile Image:</label>
                            <input type="file" className="form-control" id="fileInput" onChange={(e) => { 
                            const guidefile = e.target.files[0]; 
                                if (guidefile) {    
                                    setGuideFile(guidefile); 
                                }
                        
                        }}   />
                        </div>
                       

                        <button type="submit" className="btn btn-primary">Add you Guide</button>
                    </form>
                </div>
                )}
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th className="p-3">Agency</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Contact</th>
                            <th className="p-3">Add Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencies.map(agency => (
                            <tr key={agency.agency_id}>
                                <td><img src={agency.agency_image_url} width={100} height={100}/></td>
                                <td>{agency.name}</td>
                                <td>{agency.location}</td>
                                <td>{agency.email}</td>
                                <td>{agency.contact_no}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { setShowForm(true); setSelectedAgency({ name: agency.name, email: agency.email,contact_no:agency.contact_no,id: agency.agency_id, location: agency.location}); }}>Add Event </button>
                                    <br/>
                                    <br/>
                                    <button className="btn btn-primary" onClick={() => { setShowGuideForm(true); setSelectedAgency({ name: agency.name,id: agency.agency_id}); }}>Add Guide</button>

                                    <br/>
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
