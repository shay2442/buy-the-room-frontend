import React from "react";

export default function LogoutButton({ setUser }) {
  function handleOnClick() {
    fetch("http://localhost:3001/logout", {
      method: "DELETE",
    }).then((data) => {
      setUser(false);
    });
  }

  return <button onClick={handleOnClick}>Logout</button>;
}
