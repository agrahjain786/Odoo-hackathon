import React, { useState }  from "react";
import "../Info/Info.css";
import TextField from "@mui/material/TextField";
// import { useLocalStorage } from "./";
// import HotelIcon from "@mui/icons-material/Hotel";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
const UpdateWaste = () => {

  const [originwaste,setOriginwaste] = useState("");
  const [typewaste, setTypewaste] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [token,setToken]=useState('');


  // const navigate = useNavigate(); 
  const handleupdatesubmit= (e) => {
    e.preventDefault();
    const token=localStorage.getItem('token')
    console.log(token)

    // navigate('/Dashboard');
  
    const data = {
      wasteFrom:originwaste,
      wasteType:typewaste,
      weightInKg:quantity,
      pricePerKg:amount,
      token:token

    }
    console.log(data);
    axios.post('https://plasticwastemanage-production.up.railway.app/seller/sell',data)
    .then((res) => {
        if(res.data.data.token){
          console.log(res.data.data.token)
          console.log('Added Successfully')
        } 
      
    })
    .catch((err) => {
      console.log(err);
      toast.error('Enter correct details')
    })

  }


  return (
    <div className='Updatewaste Info'>
      <div className="center">
        <div className="incenter">
          <div className="layer1">
            <div className="signIn_logo">
            </div>
            <span className="welcome">Welcomes You</span>
          </div>
          <div className="layer2_1">
            <span>Provide Details</span>
          </div>
          <div className="layer3_1">
            <div className="input2">
              <div className="ininput2">
                <span className="waste_type">Garbage Type</span>
                <div className="divisionwastetype">
                  <div className="general">
                    <div className="generalin">
                    

<FormControl fullWidth>

<InputLabel id="demo-simple-select-label">Origin of Waste</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={originofwaste}
    label="Types of waste"
    onChange={(e) => {
      setOriginwaste(e.target.value);
    }}
    >
    <MenuItem value="Industry">Industrial</MenuItem>
    <MenuItem value="HouseHold">Household</MenuItem>
    <MenuItem value="Market">Market</MenuItem>
    <MenuItem value="Office">Office</MenuItem>

  </Select>
    </FormControl>
                    </div>
                    <div className="generalin">
                      <TextField
                        id="outlined-basic"
                        sx={{ width: "30vw" }}
                        label="Amount"
                        size="small"
                        variant="outlined"
                        type='number'
                        onChange={(e) => {
                          setAmount(e.target.value);
                        }}
                        
                        
                      />
                    </div>
                    
                  </div>
                  <div className="special">
                    <div className="generalin">
<FormControl fullWidth>

<InputLabel id="demo-simple-select-label">Types of Waste</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={typesofwaste}
    label="Types of waste"
    onChange={(e) => {
      setTypewaste(e.target.value);
    }}
    >
    <MenuItem value="Organic">Organic</MenuItem>
    <MenuItem value="Plastic">Plastic</MenuItem>
    <MenuItem value="Paper">Paper</MenuItem>
    <MenuItem value="Metal">Metal</MenuItem>
    <MenuItem value="Glass">Glass</MenuItem>


  </Select>
    </FormControl>
                    </div>
                    <div className="generalin">
                      <TextField
                        id="outlined-basic"
                        sx={{ width: "30vw" }}
                        label="Quantity in Kg"
                        size="small"
                        variant="outlined"
                        type='number'
                        onChange={(e) => {
                          setQuantity(e.target.value);
                        }}
                    
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="input3">
              <div className="ininput3">
             

              </div>            
            </div>
            <div className="signbtn">
                <button onClick={handleupdatesubmit}>Submit</button>
            </div>        
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateWaste