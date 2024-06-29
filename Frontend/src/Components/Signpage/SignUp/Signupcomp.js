// import React, { useState, useEffect } from "react";
// import "./Signupcomp.css";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import RoomIcon from "@mui/icons-material/Room"; // Import RoomIcon from Material-UI

// const Signupcomp = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [latitude, setLatitude] = useState("");
//   const [longitude, setLongitude] = useState("");

//   useEffect(() => {
//     // Fetch current location if latitude and longitude are not set
//     if (!latitude && !longitude) {
//       fetchCurrentLocation();
//     }
//   }, []);

//   const fetchCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);
//         },
//         (error) => {
//           console.error("Error getting current location:", error);
//           toast.error("Error getting current location.");
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handlesignup = (e) => {
//     e.preventDefault();
//     const data = {
//       name: name,
//       email: email,
//       phone: phone,
//       password: password,
//       role: role,
//       address: role === "Collector" ? address : "",
//       city: role === "Collector" ? city : "",
//       state: role === "Collector" ? state : "",
//       pin: role === "Collector" ? pincode : "",
//       latitude: role === "Collector" ? latitude : "",
//       longitude: role === "Collector" ? longitude : "",
//     };
//     console.log(data);
//     axios
//       .post("https://srknffdm-4000.inc1.devtunnels.ms/api/auth/signup", data)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.token) {
//           localStorage.setItem("token", res.data.token);
//           console.log(res.data.token);
//           if (role === 'Resident') {
//             navigate('/Dashboard');
//           } else if (role === 'Collector') {
//             navigate('/GarbageNearby');
//           }
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Enter valid details");
//       });
//   };

//   const handleRoleChange = (selectedRole) => {
//     setRole(selectedRole);
//     // Clear fields for Resident role
//     if (selectedRole === "Resident") {
//       setAddress("");
//       setCity("");
//       setState("");
//       setPincode("");
//       setLatitude("");
//       setLongitude("");
//       fetchCurrentLocation(); // Fetch location for Resident role
//     }
//   };

//   return (
//     <div className="Signupcomp">
//       <div className="userlogo2">
//         <AccountCircleIcon
//           sx={{
//             borderRadius: "100rem",
//             bgcolor: "white",
//             height: "5rem",
//             width: "5rem",
//           }}
//         />
//       </div>
//       <div className="layer3">
//         <div className="outerlayer">
//           <div className="Userbox2">
//             <div className="text2" id="textt">
//               <span></span>
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 placeholder="Name"
//               />
//             </div>
//             <div className="text2in" id="text">
//               <div className="ht">Role</div>
//               <div className="rradio">
//                 <div>
//                   <input
//                     onChange={() => handleRoleChange("Collector")}
//                     className="radiobutton"
//                     type="radio"
//                     checked={role === "Collector"}
//                     name="role"
//                   />
//                   <label className="radiolabels" htmlFor="role">
//                     Collector
//                   </label>
//                 </div>
//                 <div>
//                   <input
//                     onChange={() => handleRoleChange("Resident")}
//                     className="radiobutton"
//                     type="radio"
//                     checked={role === "Resident"}
//                     name="role"
//                   />
//                   <label className="radiolabels" htmlFor="role">
//                     Resident
//                   </label>
//                 </div>
//               </div>
//             </div>
//             <div className="text2">
//               <span></span>
//               <input
//                 onChange={(e) => setPhone(e.target.value)}
//                 value={phone}
//                 placeholder="Phone No."
//               />
//             </div>
//             <div className="text2">
//               <span></span>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 placeholder="Email"
//               />
//             </div>
//             <div className="text2">
//               <span></span>
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 placeholder="Password"
//               />
//             </div>
//             {role === "Collector" && (
//               <>
//                 <div className="text2">
//                   <span></span>
//                   <input
//                     onChange={(e) => setAddress(e.target.value)}
//                     value={address}
//                     placeholder="Address"
//                   />
//                 </div>
//                 <div className="text2">
//                   <span></span>
//                   <input
//                     onChange={(e) => setCity(e.target.value)}
//                     value={city}
//                     placeholder="City"
//                   />
//                 </div>
//                 <div className="text2">
//                   <span></span>
//                   <input
//                     onChange={(e) => setState(e.target.value)}
//                     value={state}
//                     placeholder="State"
//                   />
//                 </div>
//                 <div className="text2">
//                   <span></span>
//                   <input
//                     onChange={(e) => setPincode(e.target.value)}
//                     value={pincode}
//                     placeholder="Pin code"
//                   />
//                 </div>
//                 <div className="text2">
//                   <span></span>
//                   <input
//                     readOnly
//                     value={latitude}
//                     placeholder="Latitude"
//                     disabled
//                   />
//                   <RoomIcon
//                     className="location-icon"
//                     style={{ cursor: "pointer" }}
//                     onClick={fetchCurrentLocation}
//                   />
//                 </div>
//                 <div className="text2">
//                   <span></span>
//                   <input
//                     readOnly
//                     value={longitude}
//                     placeholder="Longitude"
//                     disabled
//                   />
//                 </div>
//               </>
//             )}
//             <div className="signbtn2">
//               <button onClick={handlesignup}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Signupcomp;



import React, { useState, useEffect } from "react";
import "./Signupcomp.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RoomIcon from "@mui/icons-material/Room"; // Import RoomIcon from Material-UI

const Signupcomp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    // Fetch current location if latitude and longitude are not set
    if (!latitude && !longitude) {
      fetchCurrentLocation();
    }
  }, []);

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting current location:", error);
          toast.error("Error getting current location.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handlesignup = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      phone,
      password,
      role,
      address: role === "Collector" ? address : "",
      city: role === "Collector" ? city : "",
      state: role === "Collector" ? state : "",
      pin: role === "Collector" ? pincode : "",
      latitude: role === "Collector" ? latitude : "",
      longitude: role === "Collector" ? longitude : "",
    };

    axios
      .post("https://srknffdm-4000.inc1.devtunnels.ms/api/auth/signup", data)
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userDetails", JSON.stringify(data)); // Store user details in local storage
          console.log(res.data.token);
          if (role === 'Resident') {
            navigate('/Dashboard');
          } else if (role === 'Collector') {
            navigate('/GarbageNearby');
          }
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Enter valid details");
      });
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    // Clear fields for Resident role
    if (selectedRole === "Resident") {
      setAddress("");
      setCity("");
      setState("");
      setPincode("");
      setLatitude("");
      setLongitude("");
      fetchCurrentLocation(); // Fetch location for Resident role
    }
  };

  return (
    <div className="Signupcomp">
      <div className="userlogo2">
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
        <div className="outerlayer">
          <div className="Userbox2">
            <div className="text2" id="textt">
              <span></span>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Name"
              />
            </div>
            <div className="text2in" id="text">
              <div className="ht">Role</div>
              <div className="rradio">
                <div>
                  <input
                    onChange={() => handleRoleChange("Collector")}
                    className="radiobutton"
                    type="radio"
                    checked={role === "Collector"}
                    name="role"
                  />
                  <label className="radiolabels" htmlFor="role">
                    Collector
                  </label>
                </div>
                <div>
                  <input
                    onChange={() => handleRoleChange("Resident")}
                    className="radiobutton"
                    type="radio"
                    checked={role === "Resident"}
                    name="role"
                  />
                  <label className="radiolabels" htmlFor="role">
                    Resident
                  </label>
                </div>
              </div>
            </div>
            <div className="text2">
              <span></span>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                placeholder="Phone No."
              />
            </div>
            <div className="text2">
              <span></span>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
              />
            </div>
            <div className="text2">
              <span></span>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
              />
            </div>
            {role === "Collector" && (
              <>
                <div className="text2">
                  <span></span>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    placeholder="Address"
                  />
                </div>
                <div className="text2">
                  <span></span>
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    placeholder="City"
                  />
                </div>
                <div className="text2">
                  <span></span>
                  <input
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    placeholder="State"
                  />
                </div>
                <div className="text2">
                  <span></span>
                  <input
                    onChange={(e) => setPincode(e.target.value)}
                    value={pincode}
                    placeholder="Pin code"
                  />
                </div>
                <div className="text2">
                  <span></span>
                  <input
                    readOnly
                    value={latitude}
                    placeholder="Latitude"
                    disabled
                  />
                  <RoomIcon
                    className="location-icon"
                    style={{ cursor: "pointer" }}
                    onClick={fetchCurrentLocation}
                  />
                </div>
                <div className="text2">
                  <span></span>
                  <input
                    readOnly
                    value={longitude}
                    placeholder="Longitude"
                    disabled
                  />
                </div>
              </>
            )}
            <div className="signbtn2">
              <button onClick={handlesignup}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signupcomp;

