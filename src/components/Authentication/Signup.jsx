import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConf("");

    fetch("http://localhost:3001/signup", {
      method: "POST",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          password_confirmation: passwordConf,
        },
      }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          console.log("Signup sussessful:", data);
          setUsername("");
          setEmail("");
          setPassword("");
          setPasswordConf("");
        });
      } else {
        console.warn("signup unsuccessful");
      }
    });
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}