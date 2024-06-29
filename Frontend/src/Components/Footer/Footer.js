import React from "react";
import "./Footer.css";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import logo from "../../Assets/logo.jpg";
import Marker from "../Geotag/Marker"
import GeoTag from "../Geotag/Geotag";
import MapComponent from "../Geotag/Marker";
const Footer = () => {
  return (
    <>
      <div className="Footer">
        <img src={logo} alt="img" style={{height:'30%', borderRadius:'10rem', marginLeft:'7rem'}} />
        <div className="footerfields">
          <div className="follow">
            <div>
              <span>Odoo Gujarat</span>
              <span>
                <PlaceOutlinedIcon sx={{ cursor: "pointer" }} />
              </span>
            </div>
            <div className="footerfollow">
              <span>Follow Us on</span>
            </div>
          </div>
          <div className="icons">
          <span>About Us</span>
          <span className="footericon">
            <FacebookRoundedIcon sx={{ cursor: "pointer", height:"2rem",width:'2rem' }}/>
            <TwitterIcon sx={{ cursor: "pointer", height:"2rem",width:'2rem' }}/>
            <SubscriptionsRoundedIcon sx={{ cursor: "pointer", height:"2rem",width:'2rem' }}/>
          </span>
          </div>
          <span>Project Associate</span>
          <span>Services</span>
          <span>Login</span>
        </div>
      </div>
      <div className="baseline">
        <span>Designed and Developed by Team </span>
      </div>
    </>
  );
};

export default Footer;
