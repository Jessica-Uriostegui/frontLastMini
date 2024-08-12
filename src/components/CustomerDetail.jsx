import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";


function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Error fetching orders. Try again later.");
      }    
    };
    fetchCustomerDetails();
  }, [id]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      {customer ? (
        <>
          <h3>Customer Details</h3>
          <p><strong>Customer ID:</strong> {customer.customer_id}</p>
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phone}</p>
        </>
      ) : (
        <p>Loading customer details...</p>
      )}
    </Container>
    );
}

export default CustomerDetail;