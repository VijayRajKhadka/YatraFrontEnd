import '../Css/Home.css';
import BackImg from '../Assets/mountain.jpg';
import Logo from "../Assets/logo.png";
import React, { useState } from 'react';
import Trek from "../Assets/trek2.jpg";

const Home = () => {

    const [color, setColor]= useState(false);
    const changeColor = ()=>{
        if(window.scrollY >=90){
            setColor(true)
        }
        else{
            setColor(false)
        }
    }    

    window.addEventListener('scroll',changeColor)
    return (
        <div>
            <div className='backimage'>
                <img src={BackImg} className='backimage'/>               
            </div>       
            <div className='nav-container'>
            <div className={color? 'header header-bg':'header'}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-transparent ">
                    <div className="container-fluid justify-content-center">
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">_-Home-_</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">_-About-_</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">_-Blog-_</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">_-Contact-_</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            </div>
            <div className='content-container'>
                <div className='head-container'>
                    <h1 style={{fontSize:"100px", fontWeight:"bold", color:"white", fontFamily:"cursive"}}>YATRA</h1>
                </div>
                <div className='intro-content'>
                    <p>Your Ultimate Travel Partner to Nepal</p>
                    <br/>
                    <a href='/login' style={{textDecoration:"none", color:"white",}}><button className='login-btn'>Login</button></a>&nbsp;&nbsp;
                    <a href='/signup' style={{textDecoration:"none", color:"white"}}><button className='login-btn'>Register</button></a>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <p>{'<<---Explore--->>'}</p>
                </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className='container-one-container'>
                        <div className='container-one'>
                            <h1>What is Yatra ?</h1>
                            <p>|</p>
                            <p>Yatra is your friend to your new journey.<br/>
                               Yatra enables you to plan your trips and share your journey with other travellers.<br/>
                               It enables user to add Treks, Places and Restaurants.<br/>
                               Start growing your community by sharing.<br/>
                               Lets Start by adding your first journey!, <a href='/userDashboard' style={{fontFamily:"cursive", textDecoration:"none"}}>Add Here</a>  </p>
                            <p>|</p>
                            <hr style={{marginLeft:"100px", marginRight:"100px"}}/>

                            <h1>What does Yatra Provide ?</h1>
                        </div>  
                    </div>
                    <br/>
                    <br/>

                    <div className='container-two'>

                        <div className='container-two-image' style={{marginRight:"20px"}}></div>
                        <div className='container-two-text'>
                        <h1>Trek</h1>
                        <br/>
                        <p >Treking has been a best part for exploring Nepal. Yatra 
                        Trek provides you withall information for planning your next trip. Yatra is provides
                        mobile application for viewing all the information for the journey. Yatra also allows user
                        to add theirnew finding i.e. new trek routes to hidden green treasure of Nepal.</p>
                        </div>
                    </div>
                <br/>
                    <br/>
                    <hr style={{marginLeft:"100px", marginRight:"100px"}}/>
                    <br/>
                <div>
                    
                <div className='container-two'>
                    <div className='container-two-text' style={{marginRight:"20px"}}>
                        <h1>Place</h1>
                        <br/>
                        <p style={{marginRight:"20px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    <div className='container-three-image'></div>
                    </div>
                </div>
                <br/>
                    <br/>
                    <hr style={{marginLeft:"100px", marginRight:"100px"}}/>
                    <br/>
                <div>
                </div>
            </div>   
            
        </div>
    );
}

export default Home;
