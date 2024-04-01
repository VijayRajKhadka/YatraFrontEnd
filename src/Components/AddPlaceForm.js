import {React,useState} from "react";
import "./Css/AddTrekForm.css";
import { BASE_URL } from "./Constants";
import { TRY_URL } from "./Constants";


function AddPlaceForm(){

    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [location, setLoation]=useState("");
    const [category, setCategory]=useState("");
    const [opentime, setOpenTime]=useState("");
    const [latitude, setLatitude]=useState("");
    const [longitude, setLongitude]=useState("");
    const [get_there, setGetThere]=useState("");
    const [images, setImages]=useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [image_errors, setImageErrors] = useState(null);



    function getImagePreview(event) {
        var imagediv = document.getElementById("preview");
        imagediv.innerHTML = "";
    
        for (let i = 0; i < event.target.files.length; i++) {
            var image = URL.createObjectURL(event.target.files[i]);
            var imgContainer = document.createElement("div");
            imgContainer.className = "image-container";
            var newimg = document.createElement("img");
            newimg.src = image;
            imgContainer.appendChild(newimg);
            imagediv.appendChild(imgContainer);
            }
        }

    
    function registerPlace() {
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

        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }
        console.warn(images);
        console.warn(category);

        fetch(BASE_URL + "addPlace", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
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
                <label for="placename" class="form-label">Place Name</label>
                <input type="text" class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} id="placename" placeholder="eg. Ghandruk" required/>
            </div>
            <div class="mb-3" >
                <label for="location" class="form-label">Location</label>
                <input type="text" class="form-control" value={location} onChange={(e)=>{setLoation(e.target.value)}} id="location" placeholder="eg. Kaski" required/>
            </div>
            <div class="mb-3" >
                <label for="description" class="form-label">Description</label>
                <textarea type="text" class="form-control" style={{ height: "150px" }} value={description} onChange={(e)=>{setDescription(e.target.value)}} id="description" placeholder="Please try to write detailed instruction for the trek"
                required/>
            </div>

            <br/>
            <br/>
            <label class="form-label">Category (Click to change)</label>

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group 2">
                <input type="radio" class="btn-check" name="Park" value="Park" checked={category === "Park"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio5" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio5">Park</label>

                <input type="radio" class="btn-check" name="Temple" value="Temple" checked={category === "Temple"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio6" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio6">Temple</label>

                <input type="radio" class="btn-check" name="Museum" value="Museum" checked={category === "Museum"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio7" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio7">Museum</label>

                <input type="radio" class="btn-check" name="Shopping-Mall" value="Shopping-Mall" checked={category === "Shopping-Mall"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio8" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio8">Shopping-Mall</label>

                <input type="radio" class="btn-check" name="View-Point" value="View-Point" checked={category === "View-Point"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio9" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio9">View-Point</label>
                    
                <input type="radio" class="btn-check" name="Site-Scene" value="Site-Scene" checked={category === "Site-Scene"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio10" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio10">Site-Scene</label>

                <input type="radio" class="btn-check" name="Other" value="Other" checked={category === "Other"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio11" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio11">Other</label>
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

            <div id="preview"></div>
            
            <br/>
            <br/>
            


        </div>

        <div className="form-right">
                <div class="mb-3" >
                    <label for="opentime" class="form-label">Open Time (In Meters)</label>
                    <input type="text" class="form-control" id="opentime" value={opentime} onChange={(e)=>{setOpenTime(e.target.value)}} placeholder="eg. SUN-SAT:9:00AM to 5:00PM" required/>
                </div>
                <div class="mb-3" >
                    <label for="latitude" class="form-label">Latitude of Place</label>
                    <input type="text" class="form-control" id="latitude" value={latitude} onChange={(e)=>{setLatitude(e.target.value)}} placeholder="eg 27.002345" required/>
                </div>

                <div class="mb-3" >
                    <label for="longitude" class="form-label">Longitude of Place</label>
                    <input type="text" class="form-control" id="longitude" value={longitude} onChange={(e)=>{setLongitude(e.target.value)}} placeholder="eg 67.10248" required/>
                </div>

                <div class="mb-3" >
                <label for="getthere" class="form-label">How To Get There?</label>
                <textarea type="text" class="form-control" value={get_there} onChange={(e)=>{setGetThere(e.target.value)}} id="getthere" placeholder="Step:1 , Step: 2 ..." style={{ height: "150px" }}/>
                </div>

                <br/>
                <br/>
                <br/>
                
                <button className="addtrekbutton" onClick={registerPlace}>Add Your Place</button>
        </div>
        <br/>
        
  </div>  
  </div>

);
}
export default AddPlaceForm