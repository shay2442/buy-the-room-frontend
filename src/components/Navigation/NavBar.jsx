import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from 'react-avatar';

const NavBar = ({ loggedIn, logoutUser, currentUser }) => {
  const loggedOutLinks = () => {
    return (
      <div className="body">
      <ul>
        
        <li>
          <Link className="link" to="/signup">Signup </Link>
        </li>
        <li>
          <Link className="link" to="/login">Login</Link>
        </li>
      </ul>
      </div>
    );
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser();
    
  };

  const loggedInLinks = () => {
    return (
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
    );
  };

  return <div>{loggedIn ? loggedInLinks() : loggedOutLinks()}</div>;
};

export default NavBar;