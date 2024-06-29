import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Wastestatus.css';
import Plastic from '../Plastictype/Plastic';
import Other from '../Othertype/OtherType';

const Wastestatus = () => {
  const [dash_id, setDash_id] = useState("");
  const [dash_result, setDash_result] = useState("");
  const [type_select, setType_select] = useState("Plastic");
  
  const handletype = (val) => {
    setType_select(val);
    console.log(type_select);
  }
  
  // eslint-disable-next-line
  useEffect(() => {
    setDash_id(localStorage.getItem('_id'));
    if(dash_id){
        axios.get(`https://sih-23.herokuapp.com/hospital/${dash_id}`)
        .then((res)=>{
            // console.log(res.data)
            setDash_result(res.data);
            // dash_result && console.log(dash_result.matchbadData.PlasticType.availbility);
        })
        .catch((err)=>{
            console.log(err);
        })
          }
    }  )



  return (
    <div className='Wastestatus About'>
      <div className="dash_headingg">
        <span>Waste Availability</span>
      </div>

      <div className='dash_status'>
        <span className={type_select === "Plastic"? 'dash_split1' : 'dash_split2'} value="Plastic" onClick={(e) => handletype("Plastic")}>Plastic Waste</span>
        <span className={type_select === "Other"? 'dash_split1' : 'dash_split2' }value="Other"  onClick={(e) => handletype("Other")}>Other Waste</span>
      </div>

      <div className="dash_txt">
        <span>Plastic:&nbsp;&nbsp;</span>
        {dash_result && <span className="ans">{dash_result.WasteData.PlasticType.availbility}</span>}
      </div>
      <div className="dash_txt">
        <span>Other:&nbsp;&nbsp;</span>
        {dash_result && <span className="ans">{dash_result.WasteData.OtherType.availbility}</span>}
      </div>


      {type_select === 'Plastic' && <div>
        <Plastic/>
      </div>}
      {type_select === 'Other' && <div>
        <Other/>
      </div>}
    </div>
  )
}

export default Wastestatus