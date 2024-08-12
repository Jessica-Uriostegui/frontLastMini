import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState('');
  const { id } = useParams(); // We want to get the product ID from the URL 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
          setName(response.data.name); 
          setPrice(response.data.price); 
        } catch (error) {
          console.error(`Error fetching product details: ${error}`);
          setError(error.toString()); 
        }
      }
      fetchProductDetails(); 
    }
  }, [id])

  // Function to validate the form 
  const validateForm = () => {
    const errors = {}; 

    if (!name) {
      errors.name = 'Product name is required';
    } 
    
    if (!price || price <= 0){
      errors.price = 'Price must be a positive number'; 
    }
      
    return errors 
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const validationErrors = validateForm();
    setErrors(validationErrors); 

    if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true);
        setError(null);

        const productData = {name, price}; 

      try {
        let response;
        if (id) {
          response = await axios.put(`http://127.0.0.1:5000/products/${id}`, productData);
        } else {
          response = await axios.post('http://127.0.0.1:5000/products', productData); 
        }
         
        setName('');
        setPrice(''); 
        setIsSubmitting(false);
        
        if (onProductAdded) {
          onProductAdded(response.data);
        }

        navigate('/products');


      } catch (error) {
        console.error("Error submitting the product:", error);
        setError(error.toString());
        setIsSubmitting(false); 
      }
    } 
      
  };
    
   return (
      <Container>
        <form onSubmit={handleSubmit}>
          <h3>{id ? `Edit` : `Add`} Products</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group controlId="formProductName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
            {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
          </Form.Group>

          <Form.Group controlId="formProductPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)}>
            </Form.Control>
            {errors.price && <div style={{color: 'red'}}>{errors.price}</div>}
          </Form.Group>
          
          <br />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Container>
    );
}

ProductForm.propTypes = {
  onProductAdded: PropTypes.func
};

export default ProductForm; 