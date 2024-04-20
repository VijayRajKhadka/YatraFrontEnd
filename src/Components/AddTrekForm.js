import {React,useState} from "react";
import "./Css/AddTrekForm.css";
import { TRY_URL } from "./Constants";
import GetUserInfo from './UserInfo';
function AddTrekForm(){

    const [name, setName]=useState("");
    const [description, setDescription]=useState("");
    const [location, setLocation]=useState("");
    const [category, setCategory]=useState("");
    const [altitude, setAltitude]=useState("");
    const [difficulty, setDifficulty]=useState("");
    const [no_of_days, setNoOfDays]=useState("");
    const [emergency_no, setEmergencyNo]=useState("");
    const [map_url, setMapUrl]=useState("");
    const [budgetRange, setBudgetRange]=useState("");
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
    

    function getMapPreview(event) {
   
        var image = URL.createObjectURL(event.target.files[0]);
        var imagediv = document.getElementById("mappreview");
        var newimg = document.createElement("img");
        imagediv.innerHTML = "";
        newimg.src = image;
        newimg.width = "200";
        imagediv.appendChild(newimg);
    }
    
    async function registerTrek()  {
        const userInfo = await GetUserInfo();

        if(userInfo && userInfo.id){
        setIsLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('category', category);
        formData.append('altitude', altitude);
        formData.append('difficulty', difficulty);
        formData.append('no_of_days', no_of_days);
        formData.append('emergency_no', emergency_no);
        formData.append('map_url', map_url);
        formData.append('budgetRange', budgetRange);
        formData.append('added_by',userInfo.id);
        console.warn(userInfo.id);
        for (let i = 0; i < images.length; i++) {  
            formData.append('images[]', images[i]);
        }
        console.warn(images);
        console.warn(formData);

        fetch(TRY_URL + "addTrek", {
            method: "POST",
            body: formData
        })
        .then(result => result.json())
        .then(responseData => {
           if(responseData.success===false){
            setErrors(responseData.message);
           }else{
                setSuccessMessage('Trek ' + name +' added successfully and is sent for review');
                setErrors('');
                setImageErrors('');
                setName('');
                setDescription('');
                setLocation('');
                setCategory('');
                setAltitude('');
                setDifficulty('');
                setNoOfDays('');
                setEmergencyNo('');
                setMapUrl('');
                setBudgetRange('');
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
                <label for="trekname" class="form-label">Trek Name</label>
                <input type="text" class="form-control" value={name} onChange={(e)=>{setName(e.target.value)}} id="trekname" placeholder="eg. Annapurna Base Camp Trek" required/>
            </div>
            <div class="mb-3" >
                <label for="location" class="form-label">Location</label>
                <input type="text" class="form-control" value={location} onChange={(e)=>{setLocation(e.target.value)}} id="location" placeholder="eg. Kaski" required/>
            </div>
            <div class="mb-3" >
                <label for="description" class="form-label">Description</label>
                <textarea type="text" class="form-control" value={description} onChange={(e)=>{setDescription(e.target.value)}} id="description" placeholder="Please try to write detailed instruction for the trek"
                required/>
            </div>

            <label class="form-label">Difficulty (Click to change)</label>

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group 1">
                <input type="radio" class="btn-check" name="Easy" value="Easy" checked={difficulty === "Easy"} onChange={(e)=>{setDifficulty(e.target.value)}} id="btnradio1" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio1">Easy</label>

                <input type="radio" class="btn-check" name="Intermediate" value="Intermediate" checked={difficulty === "Intermediate"} onChange={(e)=>{setDifficulty(e.target.value)}} id="btnradio2" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio2">Intermediate</label>

                <input type="radio" class="btn-check" name="Hard" value="Hard" checked={difficulty === "Hard"} onChange={(e)=>{setDifficulty(e.target.value)}} id="btnradio3" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio3">Hard</label>

                <input type="radio" class="btn-check" name="Extreme" value="Extreme" checked={difficulty === "Extreme"} onChange={(e)=>{setDifficulty(e.target.value)}} id="btnradio4" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio4">Extreme</label>
            </div>


            <br/>
            <br/>
            <label class="form-label">Category (Click to change)</label>

            <div class="btn-group" role="group" aria-label="Basic radio toggle button group 2">
                <input type="radio" class="btn-check" name="Hiking" value="Hiking" checked={category === "Hiking"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio5" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio5">Hiking</label>

                <input type="radio" class="btn-check" name="Short-Trek" value="Short-Trek" checked={category === "Short-Trek"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio6" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio6">Short-Trek</label>

                <input type="radio" class="btn-check" name="Long-Trek" value="Long-Trek" checked={category === "Long-Trek"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio7" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio7">Long-Trek</label>

                <input type="radio" class="btn-check" name="High-Altitude-Trek" value="High-Altitude-Trek" checked={category === "High-Altitude-Trek"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio8" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio8">High-Altitude-Trek</label>

                <input type="radio" class="btn-check" name="Wild-Trek" value="Wild-Trek" checked={category === "Wild-Trek"} onChange={(e)=>{setCategory(e.target.value)}} id="btnradio9" autocomplete="off"/>
                <label class="btn btn-outline-primary" for="btnradio9">Wild-Trek</label>
            </div>

            <br/>
            <br/>
            <div class="mb-3">
                <span style={{color:"red"}}>Note*: Ensure size of map and images total are Maximum of 40 MB size.</span>
                <br/>
                <br/>
                <label htmlFor="formFile" className="form-label">Trek Images (Multiple If Possible)</label>
                <input 
                    className="form-control" 
                    type="file" 
                    onChange={(e) => { 
                        const files = e.target.files;  
                        setImages(Array.from(files)); 
                        getImagePreview(e);
                    }} 
                    id="formFile" 
                    multiple 
                />
                <div id="preview" className="preview-container"></div>
            </div>


            

            


        </div>

        <div className="form-right">
                <div class="mb-3" >
                    <label for="altitude" class="form-label">Altitude (In Meters)</label>
                    <input type="text" class="form-control" id="altitude" value={altitude} onChange={(e)=>{setAltitude(e.target.value)}} placeholder="eg. 2500m" required/>
                </div>
                <div class="mb-3" >
                    <label for="no-of-days" class="form-label">Required Days for Trek</label>
                    <input type="text" class="form-control" id="no-of-days" value={no_of_days} onChange={(e)=>{setNoOfDays(e.target.value)}} placeholder="eg 7-10" required/>
                </div>

                <div class="mb-3" >
                    <label for="emergency-no" class="form-label">Emergency No</label>
                    <input type="text" class="form-control" id="emergency-no" value={emergency_no} onChange={(e)=>{setEmergencyNo(e.target.value)}} placeholder="eg 5512435/9844123435" required/>
                </div>

                <label class="form-label">Budget Range (In NRs)</label>

                <div class="btn-group" role="group" aria-label="Basic radio toggle button group 3">
                    <input type="radio" class="btn-check" name="btnradio2" id="on-five" value="1,000-5,000" checked={budgetRange === "1,000-5,000"} onChange={(e)=>{setBudgetRange(e.target.value)}} autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="on-five">1,000-5,000</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="five-ten" value="5,000-10,000" checked={budgetRange === "5,000-10,000"} onChange={(e)=>{setBudgetRange(e.target.value)}} autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="five-ten">5,000-10,000</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="ten-twenty" value="10,000-20,000" checked={budgetRange === "10,000-20,000"} onChange={(e)=>{setBudgetRange(e.target.value)}} autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="ten-twenty">10,000-20,000</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="twenty-thirty" value="20,000-30,000" checked={budgetRange === "20,000-30,000"} onChange={(e)=>{setBudgetRange(e.target.value)}} autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="twenty-thirty">20,000-30,000</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="thrity-fifty" value="30,000-50,000" checked={budgetRange === "30,000-50,000"} onChange={(e)=>{setBudgetRange(e.target.value)}} autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="thrity-fifty">30,000-50,000</label>

                    <input type="radio" class="btn-check" name="btnradio2" id="fifty-plus" value="50,000+" checked={budgetRange === "50,000+"} onChange={(e)=>{setBudgetRange(e.target.value)}} autocomplete="off"/>
                    <label class="btn btn-outline-primary" for="fifty-plus">50,000+</label>
                    </div>

                <br/>
                <br/>
                <div class="mb-3">
                    <label for="formFile" class="form-label">Trek Map Image</label>
                    <input 
                        class="form-control" 
                        type="file" 
                        onChange={(e) => { 
                            const file = e.target.files[0]; 
                                if (file) {    
                                    setMapUrl(file); 
                                    getMapPreview(e);     
                                }
                           
                        }} 
                        id="formFile" 
                    />
                </div>
                <div  className="mapdiv" id="mappreview"></div>
                <button className="addtrekbutton" onClick={registerTrek}>Add Your Journey</button>
        </div>
        <br/>
        
  </div>  
  </div>

);
}
export default AddTrekForm