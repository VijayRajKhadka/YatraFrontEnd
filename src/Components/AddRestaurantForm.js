import {React,useState} from "react";
import "./Css/AddTrekForm.css";
import { BASE_URL } from "./Constants";
import GetUserInfo from './UserInfo';


function AddRestaurantForm(){

    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [location, setLocation]=useState("");
    const [category, setCategory]=useState("");
    const [opentime, setOpenTime]=useState("");
    const [latitude, setLatitude]=useState("");
    const [longitude, setLongitude]=useState("");
    const [pan, setPan]=useState("");
    const [affordibility, setAffordibility]=useState("");
    const [get_there, setGetThere]=useState("");
    const [images, setImages]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [image_errors, setImageErrors] = useState(null);
    const [success, setSuccessMessage] = useState(null);



    function getImagePreview(event) {
        var imagediv = document.getElementById("preview");
        imagediv.innerHTML = "";
    
        for (let i = 0; i < event.target.files.length; i++) {
            var image = URL.createObjectURL(event.target.files[i]);
            var imgContainer = document.createElement("div");
            imgContainer.className = "preview-image-container"; // Changed class name here
            var newimg = document.createElement("img");
            newimg.src = image;
            imgContainer.appendChild(newimg);
            imagediv.appendChild(imgContainer);
        }
    }

    
    async function registerPlace() {
        const userInfo = await GetUserInfo();

        if(userInfo && userInfo.id){

        setIsLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('open_time', opentime);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('get_there', get_there);
        formData.append('affordability',affordibility);
        formData.append('pan', pan);
        formData.append('added_by',userInfo.id);


        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }
        console.warn(images);
        console.warn(category);
        console.warn(affordibility);
        console.warn(formData);
        fetch(BASE_URL + "addRestaurant", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
           }else{
            setSuccessMessage('Place ' + name +' added successfully and is sent for review');
            setErrors('');
            setImageErrors('');
            setName('');
            setDescription('');
            setLocation('');
            setOpenTime('');
            setLatitude('');
            setLongitude('');
            setPan('');
            setGetThere('');
            setCategory('');
            setAffordibility('');
            setImages('');
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
        }else{
            setErrors("Unauthorized, Login Again")
        }
    

    }
return(

  <div className="container">
    
        {isLoading && (
            <div className="loader-container">
                
                <div className="loader"></div>
                <div><p>Large Files Takes Time to Upload...</p></div>
            </div>
        )}
        
       
        
        <div className="form-container">
        {
            success && (
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
        
            {image_errors &&(
                <div className="invalid-error" role="alert">{image_errors} </div>)}
       
        <div className="form-left">
            
            <div class="mb-3" >
                <label for="placename" class="form-label">Restaurant Name</label>
                <input type="text" class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} id="placename" placeholder="eg. Baje ko Sekwa" required/>
            </div>
            <div class="mb-3" >
                <label for="location" class="form-label">Location</label>
                <input type="text" class="form-control" value={location} onChange={(e)=>{setLocation(e.target.value)}} id="location" placeholder="eg. Bafal" required/>
            </div>
            <div class="mb-3" >
                <p>Registration Number/PAN</p>
                <input type="text" class="form-control" value={pan} onChange={(e)=>{setPan(e.target.value)}} placeholder="eg. 975-658-34" required/>
            </div>
            <div class="mb-3" >
                <label for="description" class="form-label">Description</label>
                <textarea type="text" class="form-control" style={{ height: "150px" }} value={description} onChange={(e)=>{setDescription(e.target.value)}} id="description" placeholder="Please try to write description for this restaurant"
                required/>
            </div>

            <br/>
            <label class="form-label">Category (Click to change)</label>
                <br/>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group 2">
                <input type="radio" class="btn-check" name="Park" value="Local" checked={category === "Local"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio5" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio5">Local</label>

                <input type="radio" class="btn-check" name="Temple" value="Fancy" checked={category === "Fancy"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio6" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio6">Fancy</label>
            </div>
            

            <br/>
            <br/>
            <div class="mb-3">
                    <span style={{color:"red"}}>Note*: Ensure size of images total should be Maximum of 40 MB size.</span>
                    <br/>
                    <br/>
                    <label for="formFile" class="form-label">Place Images (Mulitple If Possible)</label>
                    <input 
                        class="form-control" 
                        type="file" 
                        onChange={(e) => { 
                            const files = e.target.files;  
                                setImages(Array.from(files)); 
                                getImagePreview(e);
                        }} 
                        id="formFile" 
                        multiple 
                    />

            </div>

            <div id="preview" className="preview-container"></div>
            
            <br/>
            <br/>
            


        </div>

        <div className="form-right" >
                <div class="mb-3" >
                    <label for="opentime" class="form-label">Open Time (In Meters)</label>
                    <input type="text" class="form-control" id="opentime" value={opentime} onChange={(e)=>{setOpenTime(e.target.value)}} placeholder="eg. SUN-SAT:9:00AM to 5:00PM" required/>
                </div>
                <div class="mb-3" >
                    <p>Latitude of Place</p>
                    <input type="text" class="form-control" id="latitude" value={latitude} onChange={(e)=>{setLatitude(e.target.value)}} placeholder="eg 27.002345" required/>
                </div>

                <div class="mb-3" >
                <p>Longitude of Place</p>
                <input type="text" class="form-control" id="longitude" value={longitude} onChange={(e)=>{setLongitude(e.target.value)}} placeholder="eg 67.10248" required/>
                </div>

                <div class="mb-3" >
                <label for="getthere" class="form-label">How To Get There?</label>
                <textarea type="text" class="form-control" value={get_there} onChange={(e)=>{setGetThere(e.target.value)}} id="getthere" placeholder="Step:1 , Step: 2 ..." style={{ height: "150px" }}/>
                </div>

                <br/>
                <label class="form-label">Affordibility(Click to change)</label>
                        <br/>
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group 3">
                <input type="radio" class="btn-check" name="Cheap" value="Cheap" checked={affordibility === "Cheap"} onChange={(e)=>{setAffordibility(e.target.value)}} id="btnradio7" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio7">Cheap</label>

                <input type="radio" class="btn-check" name="Budget-Friendly" value="Budget-Friendly" checked={affordibility === "Budget-Friendly"} onChange={(e)=>{setAffordibility(e.target.value)}} id="btnradio8" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio8">Budget-Friendly</label>

                <input type="radio" class="btn-check" name="Expensive" value="Expensive" checked={affordibility === "Expensive"} onChange={(e)=>{setAffordibility(e.target.value)}} id="btnradio9" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio9">Expensive</label>
            </div>
                <button className="addtrekbutton" onClick={registerPlace}>Add Your Place</button>
        </div>
        <br/>
        
  </div>  
  </div>

);
}
export default AddRestaurantForm