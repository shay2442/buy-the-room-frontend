import React from  'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { baseUrl, headers } from '../../Globals'

const Login = ( {loginUser, loggedIn, user, setUser, setLoggedIn}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        if( loggedIn ) {
            navigate('/rooms')
        }
    }, [loggedIn, navigate])

    

    const handleSubmit = e => {
        e.preventDefault();
    
        const strongParams = {
          username,
          password
        }
    
        
        fetch(baseUrl + '/login', {
            method: "POST",
            headers,
            body: JSON.stringify(strongParams)
          })
            .then((resp) => {
              if(resp.ok) {
               resp.json().then((data) => {
                loginUser(data.user);
                console.log(data)
                localStorage.setItem('jwt', data.token)
                navigate('/rooms');
               });
              }else {
                resp.json().then((errors) => {
                  console.log(errors.error)
                  console.log(errors)
                  setErrors(errors)
                  
                })
              }
            })
    }


      return(

    <div className="form">
            <h2 className="title">Login</h2>
            <h3 className="errors"> {errors.error} </h3>
            <form onSubmit={ handleSubmit } >
            <label>Username</label>
                <input className="input" type="text" name="" id="" value={ username } onChange= { e => setUsername(e.target.value) }/>
                <label>Password</label>
                <input className="input" type="password" name="" id="" value={ password } onChange= { e => setPassword(e.target.value) }/>
                <button className="button" onClick= { handleSubmit } type="submit" value="Login">Login</button>
                {/* <input type="submit" value="Login" /> */}
               
            </form> <br/>
           

        </div>
      )
    }

export default Login;