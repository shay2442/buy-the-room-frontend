import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, headers } from "../../Globals";

export default function Signup({user, room, setUser, loggedIn, loginUser}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate()
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (loggedIn) {
      navigate("/rooms");
    }
  }, [loggedIn, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    const strongParams = {
        user: {
          username,
          email,
          password,
          password_confirmation: passwordConf,
        },
      };

      fetch(baseUrl + "/users", {
        method: "POST",
        headers,
        body: JSON.stringify(strongParams),
      })
      .then((r) => {
          if (r.ok) {
              r.json().then((data) => {
                  loginUser(data.user);
                  localStorage.setItem("jwt", data.token);
                  navigate("/rooms");
                  console.log("successful login")
                  console.log(data)
              });
          } else {
              r.json().then((errors) => {
                  console.log(errors)
                  console.log("Unsuccessful login")
              })
          }
      })


    
  }

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username-input">Username:</label>
          <br />
          <input
            className="signup-input"
            id="username input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email-input">Email:</label>
          <br />
          <input
            className="signup-input"
            id="email input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password-input">Password:</label>
          <br />
          <input
            className="signup-input"
            id="password input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="passwordConf-input">Password Confirmation:</label>
          <br />
          <input
            className="signup-input"
            id="passwordConf input"
            type="password"
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
          />
          <br />
          <button onClick={handleSubmit} type="submit" value="Login">
           Sign Up!
          </button>
        </form>
      </div><br/>

      <Link className="link" to="/login">Already Have an account? Login</Link><br/>
      <Link className="link" to="/rooms">View rooms</Link>
    </div>
  );
}
