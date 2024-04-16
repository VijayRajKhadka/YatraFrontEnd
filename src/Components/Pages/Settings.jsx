import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar";
import "../Css/UserDashboard.css";
import UserInfo from '../UserInfo';
import { TRY_URL } from "../Constants";

const Settings = () => {
  const [displayDash, setDisplayMode] = useState("trek");
  const [userData, setUserData] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [success, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newProfile, setProfilePic]=useState("");

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    

    if(userData && userData.id){
        setIsLoading(true);

        const formData = new FormData();
        formData.append('id', userData.id);
        formData.append('old_password', oldPassword);
        formData.append('new_password', newPassword);
        formData.append('confirm_password', confirmNewPassword);

        fetch(TRY_URL + "changePassword", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
           }else{
                setSuccessMessage('Password Changed successfully');
                setErrors('');
                setDisplayMode(null);
                setConfirmNewPassword('');
                setNewPassword('');
                setOldPassword('')
           }
           
        }).finally(() => {
            setIsLoading(false);
        });;
    }

  };
  const   changeProfilePicture= (e) => {
    e.stopPropagation();
    e.preventDefault();
    if(userData && userData.id){
        setIsLoading(true);

        const formData = new FormData();
        formData.append('id', userData.id);
        formData.append('new_profile', newProfile);

        fetch(TRY_URL + "changeProfile", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
           }else{
                setSuccessMessage('Profile Image Changed successfully');
                setErrors('');
                setDisplayMode(null);
                setProfilePic(null)
           }
        }).finally(() => {
            setIsLoading(false);
        });;
    }

  };


  const showPasswordChange=()=>{
    setDisplayMode('password');
  }

  const showProfileChange=()=>{
    setDisplayMode('profile');
  }
  const closePopup = () => {
    setDisplayMode(null); 
    setErrors('');
                setDisplayMode(null);
                setConfirmNewPassword('');
                setNewPassword('');
                setOldPassword('')
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await UserInfo();
        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <div className="body-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        {isLoading && (
            <div className="loader-container">
                
                <div className="loader"></div>
                <div><p>Large Files Takes Time to Upload...</p></div>
            </div>
        )}
        {
            success && (
                <div className="success-container">
                    {success}
                </div>
            )
        }
        

        <div className="content">
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
        {userData && (
            <img
            src={userData.profile_url}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            />
            
        )}
         </div>

        <hr style={{ width: "90%", marginTop: "10px", marginBottom: "10px" }} />
        <button  className="btn btn-outline-primary" style={{ marginBottom: "5px", marginLeft:"50px" }} onClick={showPasswordChange}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
        </svg> Change Password</button>
        <hr style={{ width: "90%", marginTop: "10px", marginBottom: "10px" }} />
        <button className="btn btn-outline-primary" style={{ marginBottom: "5px" , marginLeft:"50px"}} onClick={showProfileChange}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
        <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5"/>
        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z"/>
        </svg> Change Profile Info</button>
        <hr style={{ width: "90%", marginTop: "10px", marginBottom: "10px" }} />


        {displayDash === "password" && (
            <div className="modal-container" onClick={closePopup}>
              <div className="modal-content">
              <span className="close-icon" onClick={closePopup} style={{ fontSize: "30px", cursor: "pointer" }}>&times;</span>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                {errors && (
                    <div className="error-container">
                        <div className="invalid-error" role="alert">
                            {typeof errors === 'string' ? (
                                <div>{errors}</div>
                            ) : (
                                Object.values(errors).map((errorArray, index) => (
                                    errorArray.map((error, i) => (
                                        <div key={index + i}>{error}</div>
                                    ))
                                ))
                            )}
                        </div>
                    </div>
                )}


                  <label htmlFor="oldPassword" className="form-label">Old Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="oldPassword" 
                    placeholder="Enter old password" 
                    value={oldPassword}
                    onChange={(e)=>{setOldPassword(e.target.value)}}
                    onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="newPassword" 
                    placeholder="Enter new password" 
                    value={newPassword}
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                    onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="confirmNewPassword" 
                    placeholder="Confirm new password" 
                    value={confirmNewPassword}
                    onChange={(e)=>{setConfirmNewPassword(e.target.value)}}
                    onClick={(e) => e.stopPropagation()}
                    />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
              </form>
              </div>
            </div>
          )}

        {displayDash === "profile" && (
        <div className="modal-container" onClick={closePopup}>
            <div className="modal-content">
            <span className="close-icon" onClick={closePopup} style={{ fontSize: "30px", cursor: "pointer" }}>&times;</span>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            {userData && (
                <img
                src={userData.profile_url}
                alt="Profile"
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                />
                
            )}
            </div>
            <div className="mb-3">
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
                <label htmlFor="profilePic" className="form-label">Upload New Picture</label>
                <input 
                type="file" 
                className="form-control" 
                id="profilePic" 
                accept="image/*"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => { 
                    const file = e.target.files[0]; 
                        if (file) {    
                            setProfilePic(file);       
                        }
                   
                }}  
                />
                <br></br>
                <button onClick={changeProfilePicture} className="btn btn-primary" style={{width:"100%"}}>Change Profile</button>

            </div>
            </div>
        </div>
        )}


        
        </div>
    </div>
    </div>
  );
};

export default Settings;
