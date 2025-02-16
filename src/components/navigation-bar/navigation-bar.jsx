import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import React from 'react';

export const NavigationBar = ({ user, onLoggedOut, searchQuery, setSearchQuery }) => {


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container id="navbar">
        <Navbar.Brand className='navbar-brand' as={Link} to={user ? "/" : "/login"}>
          MyFlixApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>

                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search movies by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  />
                  {searchQuery && (
                    <button className="clear-button" onClick={() => setSearchQuery("")}>
                      ✖
                    </button>
                  )}
                </div>
              </>

            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;