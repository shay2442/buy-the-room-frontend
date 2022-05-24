import React from  'react';
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Login = ( {loginUser, loggedIn, user}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate();

    // useEffect(() => {
    //     if( loggedIn ) {
    //         navigate('/places')
    //     }
    // }, [loggedIn, navigate])

    

    const handleSubmit = e => {
        e.preventDefault();
    
        const strongParams = {
          username,
          password
        }
    
        
        fetch('http://localhost:3001/login', {
          method: "POST",
          headers: { 
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user:{
            username,
            password
        }})
    })
          .then(r => r.json())
          .then(data => console.log(data))

          setUsername("")
          setPassword("")
          navigate("/rooms")
                
}


      return(

    <div className="container">
            <h2 className="title">Login</h2>
            <h3> {errors.error} </h3>
            <form onSubmit={ handleSubmit } >
            <label>Username</label>
                <input type="text" name="" id="" value={ username } onChange= { e => setUsername(e.target.value) }/>
                <label>Password</label>
                <input type="password" name="" id="" value={ password } onChange= { e => setPassword(e.target.value) }/>
                <button onClick= { handleSubmit } type="submit" value="Login">Login</button>
                {/* <input type="submit" value="Login" /> */}
               
            </form> <br/>
            <Link className="link" to="/signup">Go back to the Sign Up Form </Link>

        </div>
      )
    }

export default Login;