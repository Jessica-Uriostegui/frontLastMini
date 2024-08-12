import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function OrderForm() {
    const [customerID, setCustomerID] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
              const response = await axios.get("http://127.0.0.1:5000/products");
              setProducts(response.data);
            } catch (error) {
              console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
      }, []);

      const validateForm = () => {
        const errors = {};
        if (!customerID) errors.customerId = "Customer ID is required";
        if (!orderDate) errors.orderDate = "Order Date is required";
        if (selectedProducts.length === 0) errors.selectedProducts = "Select at least one product";
        return errors;
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
          setIsSubmitting(true);
          const orderData = { 
            customer_id: customerID, 
            date: orderDate, 
            product_ids: selectedProducts.map(product => product.product_id),
          };

          try {
            await axios.post("http://127.0.0.1:5000/orders", orderData);
            setIsSubmitting(false);
            navigate("/orders");
          } catch (error) {
            console.error('Error placing order:', error);
            setError('Error placing order. Please try againlater.');
            setIsSubmitting(false);
          }
        }
      };

      return(
        <Container>
          <h3>Place New Order</h3>
          {Error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="customerID">
                <Form.Label>Customer ID</Form.Label>
                <Form.Control
                  type="text"
                  value={customerID}
                  onChange={(event) => setCustomerID(event.target.value)}>
                </Form.Control>
                {errors.customerID && <Alert variant="danger">{errors.customerID}</Alert>}    
                </Form.Group>
                <Form.Group controlId="orderDate">
                  <Form.Label>Order Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={orderDate}
                    onChange={(event) => setOrderDate(event.target.value)}>
                  </Form.Control>
                  {errors.orderDate && <Alert variant="danger">{errors.orderDate}</Alert>}    
                </Form.Group>
                <Form.Group controlId="products">
                <Form.Label>Select Products</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={selectedProducts.map(product => product.product_id)}
                  onChange={(event) => {
                    const options = event.target.options;
                    const selected = [];
                    for (const option of options) {
                      if (option.selected) {
                        selected.push(parseInt(option.value));
                      }
                    }
                    setSelectedProducts(selected);
                  }}>
                  {products.map(product => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.name}
                    </option>
                  ))}
                </Form.Control>
                {errors.products && <Alert variant="danger">{errors.products}</Alert>}    
              </Form.Group>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </Button>
          </Form>
        </Container>
    );
}
export default OrderForm;