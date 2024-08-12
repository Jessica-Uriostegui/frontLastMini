import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Alert } from "react-bootstrap";


const ProductDetail = () =>{
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product detail. Try again later.");
      }    
    };
    fetchProductDetails();
  }, [id]);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      {product ? (
        <>
          <h3>Product Details</h3>
          <p><strong>Product ID:</strong> {product.product_id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Price:</strong> {product.price}</p>
        </>
      ) : (
        <p>Loading customer details...</p>
      )}
    </Container>
  );
}

export default ProductDetail;