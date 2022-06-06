import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';
import styled from "styled-components";
import { red } from "@mui/material/colors";
import { Grid, Menu, Button, Icon } from 'semantic-ui-react'

const NavBar = ({ loggedIn, logoutUser, currentUser }) => {
  const loggedOutLinks = () => {
    return (
      <Bar className="body">
      <ul>
        <li>
          <Link className="link" to="/signup">Signup </Link>
        </li>
        <li>
          <Link className="link" to="/login">Login</Link>
        </li>
        <li>
          <Link className="link" to="/signup">Become a Seller</Link>
        </li>
        <li>
          <Link className="link" to="/rooms">Rooms</Link>
        </li>
      </ul>
      </Bar>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    
  };

  const loggedInLinks = () => {
    return (
      <Bar>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/rooms">
            Rooms To Buy
          </Navbar.Brand>
          <Nav className="me-auto">
            <Navbar.Brand href="/rooms/new">Become a Seller</Navbar.Brand>
            </Nav>
            <Nav>
            <Navbar.Brand onClick={handleLogout} href="/">
              Logout
            </Navbar.Brand>
          </Nav>
        </Container>
      </Navbar>
      </Bar>
    );
  };

  return <div>{loggedIn ? loggedInLinks() : loggedOutLinks()}</div>;
};

export default NavBar;

const Bar = styled.div`
background-color: #5c5a54 ;
padding: 10px;
margin: 0px;
display: flex;
flex-wrap: wrap;
a.link {
  text-decoration: none;
  color: white;
  font-size: 20px;
}
a.link:hover{
  color: black;
}
a.navbar-brand{
  text-decoration: none;
  color: white;
  font-size: 20px;
}
a.navbar-brand:hover{
  color: black;
}`
