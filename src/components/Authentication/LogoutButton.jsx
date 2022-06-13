import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogoutButton({ setUser, logoutUser}) {
    // const navigate = useNavigate;
    


const handleLogout = (e) => {
    console.log("handleLogout called")
    e.preventDefault();
    logoutUser();
    // navigate("/rooms")
  };

  return <button onClick={handleLogout}>Logout</button>;
}
