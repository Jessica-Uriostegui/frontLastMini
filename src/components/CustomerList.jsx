import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ListGroup, Button, Spinner, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

import CustomerForm from './CustomerForm';
 
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);


  const fetchCustomers = () =>{
    axios.get('http://127.0.0.1:5000/customers')
      .then(response =>{
        setCustomers(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
        setError('Failed to fetch customer.');
        setIsLoading(false);
      });
  };

  const handleDelete = (customerId) => {
    axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
      .then(() => {
        setCustomers(customers.filter(customer => customer.customer_id !== customerId));
      })
      .catch(error => console.error('Error deleting customer:', error));    
  };

  const handleCustomerAdded = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
    navigate("/customers");
  };

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (customers.length === 0) {
    return <Alert variant="info">No customers found.</Alert>;
  }
  
  return (
    <Container>
      <h1>Customers</h1>
      <Routes>
        <Route
          path="/add-customer"
          element={<CustomerForm onCustomerAdded={handleCustomerAdded}/>}
        />
        <Route
          path="/"
          element={
            <ListGroup className="mt-3">
              {customers.map(customer => (
                <ListGroup.Item key={customer.customer_id}>
                  {customer.name} - {customer.email}
                  <div>
                    <Link to={`/edit-customer/${customer.customer_id}`}>
                      <Button variant="warning" className="m-2">Edit</Button>
                    </Link>
                    <Button variant="danger" onClick={() => handleDelete(customer.customer_id)}>
                      Delete
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          }
        />
      </Routes>
      <Link to="/add-customer">
        <Button variant="primary" className="m-3">Add Customer</Button>
      </Link>
    </Container>
  );
};

export default CustomerList;


















    