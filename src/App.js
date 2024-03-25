import './App.css';
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Home from './Components/Pages/Home';
import UserDashboard from './Components/Pages/UserDashboard';

import { Routes ,Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/userDashboard' element={<UserDashboard/>}/>
    </Routes>
  )
};


export default App;
