import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {

    const staticProducts = [
    { id: 1, name: "Casque audio", description: "Casque sans fil haute qualité", price: 99.99, stock: 50, image_url: "https://via.placeholder.com/300x200"  },
    { id: 2, name: "T-shirt", description: "T-shirt en coton bio", price: 29.99, stock: 100, image_url: "https://via.placeholder.com/300x200"  },
    { id: 3, name: "Livre DevOps", description: "Apprenez Docker, CI/CD, Monitoring", price: 49.99, stock: 30, image_url: "https://via.placeholder.com/300x200"  },
    { id: 4, name: "Chaise ergonomique", description: "Pour développeur sérieux", price: 199.99, stock: 15, image_url: "https://via.placeholder.com/300x200"  },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <main style={{ flex: '1 0 auto', padding: '20px' }}>
        <h2>Nos produits</h2>
        <ProductList products={staticProducts} isDeveloperMode={true} />
      </main>

      <Footer />
    </div>
  );


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