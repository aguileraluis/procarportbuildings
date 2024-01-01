import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Success from './pages/Success';
import About from './pages/About';
import Gallery from './pages/Gallery';

function App() {

  return (
    <>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route path="/cart/:totalprice/:salestax" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/:category" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
