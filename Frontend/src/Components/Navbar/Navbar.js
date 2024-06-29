import React from 'react'
import './Navbar.css'
// import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.jpg"

const Navbar = ({defaulth}) => {
 const navigate = useNavigate();

  return (
    <div className='Navbar'>
         <div className='header'>
        <div className='logo'>
        <img src={logo} alt="img" style={{height:'4rem', width:'4rem', borderRadius:'30px'}} />
        </div>
        <div className='head'>
          <button className={defaulth === 'Home'? 'selectedpgchoice' : 'onlychoice'} onClick={(e) => {navigate('/');}} value="Home">Home</button>
          <button className={defaulth === 'Garbage Nearby'? 'selectedpgchoice' : 'onlychoice'} onClick={(e) => {navigate('/garbagecollectornearby');}} value="Garbage Nearby">Collectors Nearby</button>
          <button className={defaulth === 'UserLogin'? 'selectedpgchoice' : 'onlychoice'} onClick={(e) => {navigate('/sign');}} value="Login">SignIn/SignUp</button>
          <div className='location'>
          <h3>TrashTracker</h3>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Navbar