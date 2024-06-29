import React from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Support from '../../Components/Support/Support';
import Chat from '../../Components/Chat/Chat'
import { useNavigate } from "react-router-dom";
import waste1 from "../../Assets/waste1.jpg"
import waste2 from '../../Assets/waste2.jpg'
import waste3 from '../../Assets/waste3.jpg'
import waste4 from '../../Assets/waste4.jpg'
const Home = () => {
  const navigate = useNavigate();
  const handlegarbageavailnavigate = () => {
    navigate("/GarbageNearby");
  }


  return (
    <div className='Home'>
      <div className='basecover'>
      <div className='base'>

        <Navbar defaulth={'Home'}/>
  
        <div className='tagline'>
            <span>You don't need to worry about handling the garbage</span>
        </div>
        
          <div className='logodiv'>
          </div>
        </div>
        </div>
        <div className='options'>
          <div className='opchoice' onClick={handlegarbageavailnavigate}>Garbage</div>
          <div id="hospitalchoice" className='opchoice'>GARBAGE</div>
          <div className='opchoice'>GARBAGE HANDLING</div>
        </div>
        <div className='sec2'>
          <span className='hosp_head'>Waste Management</span>

          {/* <Slider/> */}
          <div className='images'>
            <div className='hospt_img'>
            <img src={waste3} alt="img"></img>
            <div className='combine'>
            <div className='GARBAGEtate'>
            <span className='hosp'>Say No To Plastic</span>
  
            </div>
            </div>
            </div>
            
            <div className='hospt_img'>
            <img src={waste2} alt="img"></img>
            <div className='combine'>
            <div className='GARBAGEtate'>
            <span className='hosp'>Safe Environment</span>
            </div>
            </div>
            </div>

            <div className='hospt_img'>
            <img src={waste1} alt="img"></img>
            <div className='combine'>
            <div className='GARBAGEtate'>
            <span className='hosp'>Recycle</span>
            </div>
            </div>
            </div>

            <div className='hospt_img'>
            <img src={waste4} alt="img"></img>
            <div className='combine'>
            <div className='GARBAGEtate'>
            <span className='hosp'>CLEAN EARTH</span>
  
            </div>
            </div>
            </div>

          </div>
          <Chat/>
          <Support/>
          <Footer/>
        </div>

    </div>
  )
}

export default Home