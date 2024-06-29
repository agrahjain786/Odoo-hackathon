// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';
// import logo from '../../Assets/logo.jpg';
// import About from '../../Components/Dashboard/About/About';
// // import wastestatus from '../../Components/Dashboard/Waste Status/Wastestatus';
// import Hosprefimg from "../../Assets/hosprefimg.png";
// import leaf from '../../Assets/leaf.png'
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// const Dashboard = () => {


//     const [dash_id, setDash_id] = useState("");
//     const [dash_result, setDash_result] = useState("");
//     // const [token,setToken]=useState('');
//     // const [dash_booking, setDash_booking] = useState("xxx");
//      // eslint-disable-next-line
//     useEffect(() => {
//       setDash_id(localStorage.getItem('_id'));
//       console.log(localStorage.getItem('token'));
//       if(dash_id){
//           axios.get(`https://sih-23.herokuapp.com/hospital/${dash_id}`)
//           .then((res)=>{
//               // console.log(res.data)
//               setDash_result(res.data);
//             //   dash_result && console.log(dash_result.dataWaste);
//           })
//           .catch((err)=>{
//               console.log(err);
//           })
//             }
//       }
  
//       )

//     const [clicked, setClicked] = useState("about");
//     const navigate = useNavigate(); 
//     const handledashboardbtn = (val) => {
//         setClicked(val);
//         // console.log(val);
//     }
//   return (
    
//     <div className='Dashboard'>
//         <div className='headerdash'>
//             <div className='logo'>
//             <img src={logo} alt="img" style={{height:'4rem', width:'4rem', borderRadius:'30px'}} />
//             </div>
//             <div className='dashh'>
//                 <span>Dashboard</span>
//             </div>
//         </div>
//         <div className='dshsec'>
//         <div className='dashsec1'>
//                 <div onClick={(e) => handledashboardbtn("about")}className={clicked === "about"?"dashsec1_xy" : "dashsec1_xx" }>
//                     <img src={leaf} alt="img"></img>
//                 <span value="about"  className='colorx'>Waste Disposal</span>
//                 </div>
//                 <div onClick={(e) => handledashboardbtn("wastestatus")} className={clicked === "wastestatus"?"dashsec1_xy" : "dashsec1_xx" }>
//                 <img src={leaf} alt="img"></img>
//                 <span className='colorx' value="wastestatus" >Waste Recycling</span>
//                 </div>
//         </div>
        
//         <div className='dashsec2'>
//            {clicked==="about" &&  <About/>}
//            {clicked==="wastestatus" &&  <wastestatus/>}
//         </div>
//         <div className='dashsec3'>
//             <div className='dash_img'>
//                 <img src={Hosprefimg} alt="img"></img>
//             </div>
//             <div className='img_below'>
//             {dash_result && <span className="main">{dash_result.dataWaste.name}</span>}
//             {dash_result && <span className="main">{dash_result.dataWaste.city}</span>}
//             </div>
//             <div>
//                {clicked === 'about' && <button className='edit_btn' onClick={(e) => {e.preventDefault();navigate('/UpdateWaste')}}>Add Waste</button>}
//                {clicked === 'wastestatus' && <button className='edit_btn' onClick={(e) => {e.preventDefault();navigate('/garbageavailability')}}>Place Order</button>}

//             </div>
//         </div>
//         </div>
//     </div>
//   )
// }

// export default Dashboard


import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import logo from '../../Assets/logo.jpg';
import About from '../../Components/Dashboard/About/About';
import Hosprefimg from "../../Assets/hosprefimg.png";
import leaf from '../../Assets/leaf.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Dashboard = () => {
  const [clicked, setClicked] = useState("about");
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  const handledashboardbtn = (val) => {
    setClicked(val);
  }

  return (
    <div className='Dashboard'>
      <div className='headerdash'>
        <div className='logo'>
          <img src={logo} alt="img" style={{height:'4rem', width:'4rem', borderRadius:'30px'}} />
        </div>
        <div className='dashh'>
          <span>Dashboard</span>
        </div>
      </div>
      <div className='dshsec'>
        <div className='dashsec1'>
          <div onClick={() => handledashboardbtn("about")} className={clicked === "about" ? "dashsec1_xy" : "dashsec1_xx"}>
            <img src={leaf} alt="img"></img>
            <span value="about" className='colorx'>Waste Disposal</span>
          </div>
          {/* <div onClick={() => handledashboardbtn("wastestatus")} className={clicked === "wastestatus" ? "dashsec1_xy" : "dashsec1_xx"}>
            <img src={leaf} alt="img"></img>
            <span className='colorx' value="wastestatus">Waste Recycling</span>
          </div> */}
        </div>
        <div className='dashsec2'>
          {clicked === "about" && <About />}
          {clicked === "wastestatus" && <wastestatus />}
        </div>
        <div className='dashsec3'>
          <div className='dash_img'>
            <img src={Hosprefimg} alt="img"></img>
          </div>
          <div className='img_below'>
            <span className="main">{userDetails.name}</span>
            <span className="main">{userDetails.city}</span>
          </div>
          <div>
            {clicked === 'about' && <button className='edit_btn' onClick={() => navigate('/UpdateWaste')}>Add Waste</button>}
            {clicked === 'wastestatus' && <button className='edit_btn' onClick={() => navigate('/garbageavailability')}>Place Order</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
