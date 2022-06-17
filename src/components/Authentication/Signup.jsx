import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl, headers } from "../../Globals";
import { Button, Header, Form, Grid, Segment } from 'semantic-ui-react'

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
                
                  console.log("successful login")
                  console.log(data)

                  localStorage.getItem("cart")? navigate("/rooms") : navigate("/cart")
              });
          } else {
              r.json().then((errors) => {
                  console.log(errors)
                  console.log("Unsuccessful login")
                  setErrors(errors)
              })
          }
      })


    
  }

  return (
    <div style= {{ paddingTop: "50px" }}>
    {/* <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style= {{ maxWidth: 450 }}> */}
        
         <Header className="signup">Sign Up!</Header>
         <h3 className="errors"> {errors.error} </h3>
        
          <form onSubmit={handleSubmit}>

              
                 
                  <input className="input" 
                     placeholder='Username'
                     name="username"
                      type='text'
                      id='username'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      />
                       <input className="input" 
                      placeholder='ex: email@email.com'
                      name="email"
                       type="text"
                       id="email"
                       value={email} 
                       onChange={(e) => setEmail(e.target.value)}
                      />
                  <input className="input" 
                      placeholder='Password'
                      name="password"
                      icon='lock'
                      iconPosition='left'
                      type='password'  
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                       />
                   <input className="input" 
                      placeholder='Password Confirmation'
                      name="passwordConfirmation"
                      icon='lock'
                      iconPosition='left'
                      type='password'  
                      id='passwordConfirmation'
                      value={passwordConf}
                      onChange={(e) => setPasswordConf(e.target.value)}
                   />
              

            
                  <Button disabled={passwordConf.length < 1 || password !== passwordConf} color='blue'fluid type='submit'>Sign Up</Button>
                  
         

          </form>
            



  <br/>

      <Link className="link" to="/login">Already Have an account? Login</Link><br/>
      <Link className="link" to="/rooms">View rooms</Link>
    </div>
  );
}
