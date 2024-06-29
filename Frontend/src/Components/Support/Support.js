import React from "react";
import "./Support.css";
import PublicIcon from '@mui/icons-material/Public';
const Support = () => {
  return (
    <div className="support_outer">
      <div className="iconbox">
      <div className="hearticon">
        <PublicIcon sx={{ width: "3rem", height: "3rem"  }} color="success"/>
      </div>
      </div>
      <div className="Support">
        <span>Support Us</span>
      </div>
    </div>
  );
};

export default Support;
