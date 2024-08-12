import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, ListGroup, Alert } from 'react-bootstrap'; 


function OrderList() {
  const [orders, setOrders] = useState([])
  const [errors, setErrors] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setErrors("Error fetching orders. Try again later.");
      }    
    };
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/orders/${id}`);
      setOrders(orders.filter(order => order.order_id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
      setErrors("Error deleting order. Try again later.");
    }
  };

  return (
    <container>
      <h3>Orders</h3>
      {errors && <Alert variant="danger">{errors}</Alert>}
      <ListGroup>
        {orders.map(order => (
          <ListGroup.Item key={order.order_id}>
            <div>
              <strong>Order ID:</strong> {order.order_id} 
              <br />
              <strong>Customer ID:</strong> {order.customer_id}
              <br />
              <strong>Order Date:</strong> {order.date}
              <br />
              <Button Variant="primary" onClick={() => navigate(`/edit-order/${order.order_id}`)}>Edit</Button>
              <Button variant="danger" onClick={() => deleteOrder(order.order_id)}>Delete</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </container>
  );
}

export default OrderList;

   
    
