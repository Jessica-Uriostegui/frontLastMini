import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container } from "react-bootstrap";

function ProductEdit() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/products/${id}`);
          setName(response.data.name);
          setPrice(response.data.price);
        } catch (error) {
          console.error(`Error fetching product details: ${error}`);
          setError(error.toString());
        }
      };
      fetchProductDetails();
    }, [id]);
      
      const validateForm = () => {
        const errors = {};
        if (!name) errors.name = "Product name is required";
        if (!price || price <= 0) errors.price = "Price must be a positive number";
        return errors;
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
          setIsSubmitting(true);
          setError(null);
          const productData = { name, price };
          try {
            await axios.put(`http://127.0.0.1:5000/products/${id}`, productData);
            setIsSubmitting(false);
            navigate("/products");
          } catch (error) {
            console.error("Error updating the product:", error);
            setError(error.toString());
            setIsSubmitting(false);
          }
        }
    };

    return (
      <Container>
        <h3>Edit Product</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}>
            </Form.Control>
            {errors.name && <div style={{color:'red'}}>{errors.name}</div>}
          </Form.Group>
          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}>
            </Form.Control>
            {errors.price && <div style={{color: 'red'}}>{errors.price}</div>}
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Product"}
          </Button>
        </Form>
      </Container>
   );
}

export default ProductEdit;
