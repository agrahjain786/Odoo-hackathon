import React, { useState } from 'react';
import "./SignIncomp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignIncomp = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handlesignin = (e) => {
    e.preventDefault();

    const data = {
      email: userId,
      password: password,
      role: role
    };

    axios.post('https://srknffdm-4000.inc1.devtunnels.ms/api/auth/signin', data)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          if (role === 'Resident' || role === 'Admin') {
            navigate('/Dashboard');
          } else if (role === 'Collector') {
            navigate('/GarbageNearby');
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Enter correct details');
      });
  };

  return (
    <div className='SignIncomp'>
      <div className="userlogo">
        <AccountCircleIcon
          sx={{
            borderRadius: "100rem",
            bgcolor: "white",
            height: "5rem",
            width: "5rem",
          }}
        />
      </div>
      <div className="layer3">
        <div className="Userbox">
          <div className="text1" id="text">
            <span></span>
            <input onChange={(e) => { setUserId(e.target.value) }} value={userId} placeholder="Email" />
          </div>
          <div className="rradio">
            <div>
              <input onChange={() => setRole('Collector')} className="radiobutton" type="radio" value={role} name="role" id='role' />
              <label className='radiolabels' htmlFor="role">Collector</label>
            </div>
            <div>
              <input onChange={() => setRole('Resident')} className="radiobutton" type="radio" value={role} name="role" id='role' />
              <label className='radiolabels' htmlFor="role">Resident</label>
            </div>
            <div>
              <input onChange={() => setRole('Admin')} className="radiobutton" type="radio" value={role} name="role" id='role' />
              <label className='radiolabels' htmlFor="role">Admin</label>
            </div>
          </div>
          <div className="text1">
            <span></span>
            <input onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="Password" />
          </div>
          <div className="signbtn">
            <button onClick={handlesignin}>Sign In</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIncomp;
