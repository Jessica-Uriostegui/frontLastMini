import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';
import { Container, Alert, ListGroup } from 'react-bootstrap';

function OrderDetails () {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/orders/${id}`);
                setOrder(response.data);
              } catch (error) {
                console.error('Error fetching order details:', error);
                setError('Error fetching order details. Try again later.');
              }
            };
            fetchOrderDetails();
        }, [id]);

        if (error) return <Alert variant="danger">{error}</Alert>;

        return(
           <Container>
                {order ? (
                    <>
                    <h3> Order Details</h3>
                    <p><strong>Order ID:</strong> {order.order_id}</p>
                    <p><strong>Customer ID:</strong> {order.customer_id}</p>
                    <p><strong>Order Date:</strong> {order.date}</p>
                    <ListGroup>
                        <strong>Products:</strong>
                        {order.products.map(product => (
                            <ListGroup.Item key={product.product_id}>
                                {product.name} - ${product.price}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </>
                ) : (
                   <p>Loading...</p>
                )}
           </Container>
        );
    }

export default OrderDetails;    


    