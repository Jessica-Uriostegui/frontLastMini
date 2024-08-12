
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CustomerList from './components/CustomerList'
import CustomerDetail from './components/CustomerDetail';
import CustomerForm from './components/CustomerForm';
import CustomerEdit from './components/CustomerEdit';
import ProductEdit from './components/ProductEdit';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductForm from './components/ProductForm';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderDetail from './components/OrderDetail';

import NavigationBar from './NavigationBar';
import NotFound from './NotFound';
import "./AppStyles.css"; 

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  // const [orders, setOrders] = useState([]);

  const handleCustomerAdded = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };
  
  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  // const handleOrderAdded = (newOrder) => {
  //   setOrders([...orders, newOrder]);
  // };

  return ( 
    <div className='app-container'>
      <NavigationBar />
      <Routes>
          <Route path='/' element={ <Home />} />
          <Route path='/edit-customer/:id/' element={ <CustomerEdit />} />
          <Route path='/add-customer/' element={ <CustomerForm onCustomerAdded={handleCustomerAdded} />} />
          <Route path='/customers' element={ <CustomerList customers={customers} />} />
          <Route path='/customer/:id/' element={ <CustomerDetail />} />
          <Route path='/product/:id/' element={ <ProductDetail />} />
          <Route path='/edit-product/:id/' element={ <ProductEdit /> }/>
          <Route path="/add-product" element={<ProductForm onProductAdded={handleProductAdded} />} />
          <Route path="/products" element={<ProductList products={products} />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/order/:id" element={<OrderDetail />} />
          
          <Route path="/add-order" element={<OrderForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );
};

export default App;
