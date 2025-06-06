import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const isDeveloperMode = true; // À désactiver en production

  const fetchProducts = async () => {
    const res = await fetch('http://localhost/api/articles/');
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async (product) => {
    const res = await fetch('http://localhost/api/articles/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      fetchProducts();
      return true;
    }
    return false;
  };

  const handleUpdateProduct = async (id, product) => {
    const res = await fetch(`http://localhost/api/articles/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      fetchProducts();
      return true;
    }
    return false;
  };

  const handleDeleteProduct = async (id) => {
    const res = await fetch(`http://localhost/api/articles/${id}/`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList products={products} isDeveloperMode={isDeveloperMode} onDeleteProduct={handleDeleteProduct} />} />
        <Route path="/add" element={<AddProductForm onAddProduct={handleAddProduct} />} />
        <Route path="/edit/:productId" element={
          <ProductList products={products} onUpdateProduct={handleUpdateProduct} />
        } />
      </Routes>
    </Router>
  );
}

export default App;