import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import styled from "styled-components";
import { red } from "@mui/material/colors";
import { Grid, Menu, Button, Icon } from "semantic-ui-react";

const NavBar = ({ loggedIn, logoutUser, currentUser }) => {
  const navigate = useNavigate();
  const loggedOutLinks = () => {
    return (
      <Bar className="body">
        <ul>
          <li>
            <Link className="link" to="/signup">
              <b>Signup{" "}</b>
            </Link>
          </li>
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="link" to="/signup">
              Become a Seller
            </Link>
          </li>
          <li>
            <Link className="link" to="/rooms">
              Rooms
            </Link>
          </li>
        </ul>
      </Bar>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    navigate('/rooms')
  };

  const loggedInLinks = () => {
    return (
      <Bar>
        <Container>
          <Navbar.Brand href="/rooms">Rooms To Buy</Navbar.Brand>
          <Nav>
            <Navbar.Brand href="/rooms/new">Become a Seller</Navbar.Brand>
          </Nav>

          <Navbar.Brand onClick={handleLogout} href="/">
            Logout
          </Navbar.Brand>
        </Container>
      </Bar>
    );
  };

  return <div>{loggedIn ? loggedInLinks() : loggedOutLinks()}</div>;
};

export default NavBar;

const Bar = styled.div`
  background-color: rgb(195, 206, 216);
  height: 132px;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  a.link {
    text-decoration: none;
    color: #5c5a54;
    font-size: 20px;
    font-weight: bold;
  }
  a.link:hover {
    color: black;
  }
  a.navbar-brand {
    text-decoration: none;
    color: rgb(105, 99, 99);
    font-size: 20px;
    font-weight: bold;
  }
  a.navbar-brand:hover {
    color: black;
  }
`;
