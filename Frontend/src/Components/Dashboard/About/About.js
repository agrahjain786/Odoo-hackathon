import React, { useEffect, useState } from "react";
import "./About.css";

const About = () => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
  }, []);

  return (
    <div className="About">
      <div className="dash_headingg">
        <span className="ans">{userDetails.name}</span>
      </div>
      <div className="dash_txt">
        <span>Name:&nbsp;&nbsp;</span>
        <span className="ans">{userDetails.name}</span>
      </div>
      <div className="dash_txt">
        <span>Role:&nbsp;&nbsp;</span>
        <span className="ans">{userDetails.role}</span>
      </div>
      {/* <div className="dash_txt">
        <span>State:&nbsp;&nbsp;</span>
        <span className="ans">{userDetails.state}</span>
      </div> */}
      <div className="dash_txt">
        <span>Phone No:&nbsp;&nbsp;</span>
        <span className="ans">{userDetails.phone}</span>
      </div>
      <div className="dash_txt">
        <span>Email:&nbsp;&nbsp;</span>
        <span className="ans">{userDetails.email}</span>
      </div>
    </div>
  );
};

export default About;
