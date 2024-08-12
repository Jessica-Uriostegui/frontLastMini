import React, {useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate} from "react-router-dom";

function CustomerForm({ onCustomerAdded }) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});// const customer = {name: "", phone: "", email: ""}
  const navigate = useNavigate();
  
  const validationForm = () => {
    const errors = {};
  
    if (!customerName) {
      errors.name = 'Name is required';
    }
    if (!customerPhone) {
      errors.phone = 'Phone is required';
    }
    if (!customerEmail) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerEmail)) {
      errors.email = 'Email address is invalid';
    }

    return errors;
  };

  // Write a function to handle form submission 
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validationForm();
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setError(''); 
      try{
        const response = await axios.post('http://127.0.0.1:5000/customers', {
          name: customerName,
          phone: customerPhone,
          email: customerEmail
        });
        
        onCustomerAdded(response.data);
        setIsLoading(false);
        setCustomerName('');
        setCustomerEmail('');
        setCustomerPhone('');
        navigate("/customers");
      } catch (error) {
        console.error("Error submitting customer data:", error);
        setError("There was an error submitting the customer");
        setIsLoading(false);
      }
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name ==="name") setCustomerName(value);
    if (name ==="email") setCustomerEmail(value);
    if (name ==="phone") setCustomerPhone(value);
  };

  

  return (
    <Container>
      
      {isLoading && <Alert variant="info">Submitting customer data</Alert>}
      {error && <Alert variant="danger">Error submitting customer data: {error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            value={customerName} 
            onChange={handleChange}
            autocomplete="off">
          </Form.Control> 
          {errors && <div style={{ color: 'red' }}>{errors.email}</div>}
        </Form.Group>
        <Form.Group controlId="formGroupPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control 
            type="text" 
            name="phone" 
            value={customerPhone} 
            onChange={handleChange}
            autocomplete="off">
          </Form.Control>
          {errors && <div style={{color: 'red'}}>{errors.email}</div>}
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="text" 
            name="email" 
            value={customerEmail} 
            onChange={handleChange}
            autocomplete="off">
          </Form.Control>
          {errors && <div style={{color: 'red'}}>{errors.email}</div>}
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit" disabled={isLoading}>Submit</Button>
      </Form>
    </Container>
  );
}

CustomerForm.propTypes = {
  onCustomerAdded: PropTypes.func.isRequired,
};

export default CustomerForm; 