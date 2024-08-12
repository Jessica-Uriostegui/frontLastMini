import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";

function CustomerEdit() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();
  console.log("Customer ID from useParams:", id);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Customer ID from useParams:", id);
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (error) {
        console.error(`Error fetching customer details:`, error);
        if (error.response) {
            if (error.response.status === 404) {
              setError("Customer not found");
            } else {
              setError("An error occurred. Try again later.");
            }
          } else if (error.request) {
            setError("Network error. Try again later.");
          } else {
            setError('Error ${error.message}');
          }
          console.error('Error fetching customer details:, ${error}');
      }
    };
    fetchCustomerDetails();
  }, [id]);

  const validateForm = () => {
    const errors = {} ;
    if(!name) errors.name = "Customer name is required";
    if(!email) errors.email = "Customer email is required";
    if(!phone) errors.phone = "Customer phone is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setError(null);
      const customerData = { name, email, phone };
      try {
        await axios.put(`http://127.0.0.1:5000/customers/${id}`, customerData);
        setIsSubmitting(false);
        navigate("/customers");
      } catch (error) {
        console.error("Error updating the customer:" , error);
        setError(error.toString());
        setIsSubmitting(false);
      } 
    }
  };

  return (
    <Container>
        <h3>Edit Customer</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCustomerName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              value={name}
              onChange={(event) => setName(event.target.value)}>
            </Form.Control>
            {errors.name && <Alert variant="danger">{errors.name}</Alert>}
          </Form.Group>
          <Form.Group controlId="formCustomerEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="Email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}>
            </Form.Control>
            {errors.email && <Alert variant="danger">{errors.email}</Alert>}
          </Form.Group>
          <Form.Group controlId="formCustomerPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control 
              type="Phone" 
              value={phone}
              onChange={(event) => setPhone(event.target.value)}>
            </Form.Control>
            {errors.phone && <Alert variant="danger">{errors.phone}</Alert>}
          </Form.Group>
          <br></br>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Customer"}
          </Button>
        </Form>
    </Container>
  );
}

export default CustomerEdit;

    
 