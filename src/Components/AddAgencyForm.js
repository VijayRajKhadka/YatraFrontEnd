import React, { useState } from "react";
import "./Css/AddTrekForm.css";
import { TRY_URL } from "./Constants";
import GetUserInfo from './UserInfo';

function AddAgencyForm() {
    const [agencyName, setAgencyName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [success, setSuccessMessage] = useState(null);
    const [documentUrl, setDocumentUrl]=useState("");
    const [imageUrl, setImageUrl]=useState("");



    function getDocumentPreview(event) {
   
        var image = URL.createObjectURL(event.target.files[0]);
        var imagediv = document.getElementById("documentPreview");
        var newimg = document.createElement("img");
        imagediv.innerHTML = "";
        newimg.src = image;
        newimg.width = "200";
        imagediv.appendChild(newimg);
    }
    function getImagePreview(event) {
   
        var image = URL.createObjectURL(event.target.files[0]);
        var imagediv = document.getElementById("imagePreview");
        var newimg = document.createElement("img");
        imagediv.innerHTML = "";
        newimg.src = image;
        newimg.width = "200";
        imagediv.appendChild(newimg);
    }


    async function registerAgency() {
        const userInfo = await GetUserInfo();

        if (userInfo && userInfo.id) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('name', agencyName);
            formData.append('email', email);
            formData.append('location', location);
            formData.append('contact_no', contact);
            formData.append('registration_no', registrationNumber);
            formData.append('document_url', documentUrl);
            formData.append('agency_image_url', imageUrl);
            formData.append('added_by', userInfo.id);

            fetch(TRY_URL + "addAgency", {
                method: "POST",
                body: formData
            })
            .then(result => result.json())
            .then(responseData => {
                if (responseData.success === false) {
                    setErrors(responseData.message);
                    
                } else {
                    setSuccessMessage('Agency ' + agencyName + ' added successfully and is sent for review');
                    setErrors('');
                    setAgencyName('');
                    setEmail('');
                    setLocation('');
                    setContact('');
                    setRegistrationNumber('');
                    setDocumentUrl(null);
                    setImageUrl(null);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrors('An error occurred while processing your request.');
            })
            .finally(() => {
                setIsLoading(false);
            });
        } else {
            setErrors("Unauthorized, Login Again");
        }
    }

    return (
        <div className="container">
            {isLoading && (
                <div className="loader-container">
                    <div className="loader"></div>
                    <div><p>Large Files Takes Time to Upload...</p></div>
                </div>
            )}
            
            <div className="form-container" style={{width:"100%",}}>
                {success && (
                    <div className="success-container">
                        {success}
                    </div>
                )}
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
                <div style={{width:"100%"}}>
                    <div className="mb-3">
                        <label htmlFor="agencyName" className="form-label">Agency Name</label>
                        <input type="text" className="form-control" value={agencyName} onChange={(e) => { setAgencyName(e.target.value) }} id="agencyName" placeholder="eg. Lakhe Travels" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} id="email" placeholder="eg. example@example.com" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <input type="text" className="form-control" value={location} onChange={(e) => { setLocation(e.target.value) }} id="location" placeholder="eg. Gali Road, Thamel, Kathmandu" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" value={contact} onChange={(e) => { setContact(e.target.value) }} id="contact" placeholder="eg. +977-123456789" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="registrationNumber" className="form-label">Registration Number/PAN</label>
                        <input type="text" className="form-control" id="registrationNumber" value={registrationNumber} onChange={(e) => { setRegistrationNumber(e.target.value) }} placeholder="registration or pan number" required />
                    </div>
                    <div class="mb-3">
                    <label for="formFile" class="form-label">Document Photo</label>
                    <input 
                        class="form-control" 
                        type="file" 
                        onChange={(e) => { 
                            const file = e.target.files[0]; 
                                if (file) {    
                                    setDocumentUrl(file); 
                                    getDocumentPreview(e);     
                                }
                           
                        }} 
                        id="formFile" 
                    />
                    <br/>
                    <br/>
                <div  className="mapdiv" id="documentPreview"></div>
                <label for="formFile" class="form-label">One Image of your Agency</label>
                    <input 
                        class="form-control" 
                        type="file" 
                        onChange={(e) => { 
                            const file = e.target.files[0]; 
                                if (file) {    
                                    setImageUrl(file); 
                                    getImagePreview(e);     
                                }
                           
                        }} 
                        id="formFile" 
                    />
                    <br/>
                <div  className="mapdiv" id="imagePreview"></div>
                </div>
                    <button className="addtrekbutton" onClick={registerAgency}>Add You Business</button>
                </div>
            </div>
        </div>
    );
}

export default AddAgencyForm;
