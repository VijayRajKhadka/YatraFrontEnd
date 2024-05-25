import './App.css';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Home from './Components/Pages/Home';
import UserDashboard from './Components/Pages/UserDashboard';
import RestaurantEvents from './Components/Pages/RestaurantEvents';
import AgencyEvents from './Components/Pages/TravelAgencyEvents';
import Settings from './Components/Pages/Settings';
import Cookies from "js-cookie";
import { Routes ,Route} from 'react-router-dom';
import TrekFormPage from './Components/Pages/TrekFormPage';
import PlaceFormPage from './Components/Pages/PlaceFormPage';
import RestaurantFormPage from './Components/Pages/RestaurantFormPage';

const App = () => {
  const authenticated = Cookies.get("token");
 
  return (
    <Routes>
     
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/restaurantEvents' element={authenticated?<RestaurantEvents/>:<Login/>}/>
      <Route path='/agencyEvents' element={authenticated?<AgencyEvents/>:<Login/>}/>
      <Route path='/settings' element={authenticated?<Settings/>:<Login/>}/>
      <Route path='/userDashboard' element={authenticated?<UserDashboard/>:<Login/>}/>
      <Route path='/addTrek' element={authenticated?<TrekFormPage/>:<Login/>}/>
      <Route path='/addPlace' element={authenticated?<PlaceFormPage/>:<Login/>}/>
      <Route path='/addRestaurant' element={authenticated?<RestaurantFormPage/>:<Login/>}/>


    </Routes>
  )
};


export default App;
