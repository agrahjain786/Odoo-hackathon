import React, { useEffect, useState } from "react";
import "./sellerlist.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Button from '@mui/material/Button';
import Button from "@mui/material/Button";
// import { width } from "@mui/system";
const Sellerlist = ({
  email,
  wasteid,
  name,
  mobilenum,
  city,
  wasteFrom,
  wasteType,
  weightInKg,
  pricePerKg,
  contactInfo
}) => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [waste_avail, setwaste_avail] = useState("");
  const [disable, setDisable] = useState("");

  useEffect(() => {
    if (wasteid) {
      const data = {
        Id: wasteid,
      };
      axios
        .post("https://sih-23.herokuapp.com/hospitalbyid", data)
        .then((res) => {
          setwaste_avail(res.data);
          if (
            res.data.wasteData.plasticType.availbility +
              res.data.wasteData.otherType.availbility <=
            0
          ) {
            setDisable("yes");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  return (
    <div className="hrline">
      <div className="Hosplist">
        <div className="inHosplist">
          <div className="hosplistimg">
            <img
              src="https://images.thequint.com/thequint%2F2018-08%2F79e4c234-cbb9-4b1e-bef1-cfda5fa80289%2FIMG_5379.JPG?auto=format%2Ccompress&fmt=webp&width=720"
              alt="img"
            ></img>
          </div>
          <div className="hosplisttxt">
            <div className="hosplisttitle">
              <span>Seller : </span>
              <span key={name}>{name}</span>
            </div>
            <div className="shorttxt">
              {/* <div className='line'>
                    <span>Contact No:</span>
                    <span key={mobilenum} className='bluetxt'>{mobilenum}</span>
                </div> */}

              <div className="line">
                <span>Waste From:</span>
                <span key={name} className="bluetxt">
                  {wasteFrom}
                </span>
              </div>
              <div className="line">
                <span>Waste Type:</span>
                <span key={name} className="bluetxt">
                  {wasteType}
                </span>
              </div>
              <div className="line">
                <span>Quantity (kg):</span>
                <span key={name} className="bluetxt">
                  {weightInKg}
                </span>
              </div>
              <div className="line">
                <span>Price (/kg) :</span>
                <span key={name} className="bluetxt">
                  Rs {pricePerKg}
                </span>
              </div>

              <div className="line">
                <span>Contact Info : </span>
                <span key={name} className="bluetxt">
                  {contactInfo.email} ({contactInfo.phone})
                </span>
              </div>              

            </div>
          </div>
          <div className="moreinfo">
            <span>
              {disable === "" && (
                <Button
                  color="success"
                  sx={{ width: "10rem" }}
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/garbageavailability", { state: { wasteid } });
                  }}
                >
                  Confirm the purchase
                </Button>
              )}
              {disable === "yes" && (
                <Button
                  disabled
                  color="success"
                  sx={{ width: "10rem" }}
                  variant="contained"
                >
                  Confirm the purchase
                </Button>
              )}
            </span>
          </div>
        </div>
      </div>
      <div></div>
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
  );
};

export default Sellerlist;
