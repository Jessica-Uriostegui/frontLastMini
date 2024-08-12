import React, {useState} from "react";
import { NavLink } from 'react-router-dom'
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function NavigationBar() {

  const[expanded, setExpanded] = useState(false);

  const handleToggle = () =>  setExpanded(expanded ? false : 'expanded');
  const handleSelect = () =>  setExpanded(false);
  
  return (
    <Navbar  bg='light' expand="lg" expanded={expanded} onToggle={handleToggle}>
      <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" onClick={handleSelect}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add-customer/" onClick={handleSelect}>
            Add Customers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/customers" onClick={handleSelect}>
            Customers
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add-product" onClick={handleSelect}>
            Add Product
          </Nav.Link>
          <Nav.Link as={NavLink} to="/products" onClick={handleSelect}>
            Products
          </Nav.Link>
          <Nav.Link as={NavLink} to="/orders" onClick={handleSelect}>
            Orders
          </Nav.Link>
          <Nav.Link as={NavLink} to="/add-order" onClick={handleSelect}>
            Add Order
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default NavigationBar; 