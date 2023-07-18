import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Outlet } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {Link} from "react-router-dom";

function Header() {
  let { isAuth, logoutUser } = useContext(AuthContext);


  if (!isAuth) {
    return(
      <>
      <Navbar className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/"><i className="fa-solid fa-house-user"></i> Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/about-us"><i className="fa-solid fa-address-card"></i> About</Nav.Link>
                <Nav.Link href="/signup/" className='btn lightButton'><i className="fa-solid fa-right-to-bracket"></i> SignUp</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet/>
      </>
    )
  
  }else {
    return (<>
      <Navbar className="mb-3">
        <Container fluid>
          <Navbar.Brand href="/"><i className="fa-solid fa-house-user"></i> Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link href="/collection"><i className="fa-solid fa-book-open-reader"></i> Collection</Nav.Link>
                <Nav.Link href="/about-us"><i className="fa-solid fa-address-card"></i> About</Nav.Link>
                <Nav.Link href="/profile"> <i className="fa-solid fa-circle-user"></i> Profile</Nav.Link>
                <Link to='/' onClick={ logoutUser } className='btn lightButton'><i className="fa-solid fa-arrow-right-from-bracket"></i> Log Out</Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet/>
    </>)
  }
}

export default Header;