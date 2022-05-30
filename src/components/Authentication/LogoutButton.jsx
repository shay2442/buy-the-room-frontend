import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogoutButton({ setUser, logoutUser}) {
    // const navigate = useNavigate;
    
//   function handleOnClick() {
//     fetch("http://localhost:3001/logout", {
//       method: "DELETE",
//     }).then((data) => {
//       setUser(false);
//     });
//   }

const handleLogout = (e) => {
    console.log("handleLogout called")
    e.preventDefault();
    logoutUser();
    // navigate("/rooms")
  };

  return <button onClick={handleLogout}>Logout</button>;
}
