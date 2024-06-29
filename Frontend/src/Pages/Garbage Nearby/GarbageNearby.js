import React, { useEffect, useState } from "react";
import "./GarbageNearby.css";
// import Hosplist from "../../Components/sellerlist/Sellerlist";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import Support from "../../Components/Support/Support";
import Footer from "../../Components/Footer/Footer";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Sellerlist from "../../Components/sellerlist/Sellerlist";

const GarbageNearby = () => {
  const [wastedata, setWastedata] = useState();
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  // const [happen, setHappen] = useState('');

   useEffect(() => {
    axios
      .get("https://plasticwastemanage-production.up.railway.app/data/getSellData")
      .then((res) => {
        console.log(res)
        setWastedata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);


  const handlefilter=()=>{

  }


  return (
    <div className="HospitalsNearby">
      <Navbar defaulth={"Hospitals Nearby"} />

      <div className="filterout">
      <TextField
          label="pincode"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <TextField
          label="City"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        /> 
         <TextField
          label="Waste Type"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          // value={waste}
          onChange={(e) => setCity(e.target.value)}
        /> 
         <Button variant="contained" onClick={handlefilter}>Filter Out</Button>{" "}
      </div>

      <div className="hrline">
        <hr
          style={{
            width: "75vw",
            height: "2px",
            borderwidth: "0",
            color: "gray",
            backgroundColor: "gray",
          }}
        />
      </div>
      <div className="hosplisttt">

        {wastedata && 
          wastedata.map((val, i) => (
            <Sellerlist key={i}
            name={val.name}
              wasteFrom={val.wasteFrom}
              wasteType={val.wasteType}
              weightInKg={val.weightInKg}
              pricePerKg={val.pricePerKg}
              contactInfo={val.seller[0]}
                
              
              se
            />
          ))}
      </div>

      <Support />
      <Footer />
    </div>
  );
};

export default GarbageNearby;
