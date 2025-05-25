import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import EditProductForm from './components/EditProductForm';
import ProductList from './components/ProductList';

function App() {
  const isProd = import.meta.env.MODE === 'production';
  const isDev = !isProd;

  const [products, setProducts] = useState([
    {
      title: 'iPhone 15 Pro',
      images: [
        '/images/img1.png',
        '/images/img2.png',
        '/images/img3.jpg',
      ],
      description: "L'iPhone 15 Pro en titane noir, performant et élégant.",
      stock: 8,
      price: 1349,
    },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);

  const handleOrder = (title) => {
    alert(`Commande enregistrée pour le produit : ${title}`);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct) => {
    setProducts(products.map(p => (p.title === updatedProduct.title ? updatedProduct : p)));
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/monmodele/')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Données depuis Django API</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.nom}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h1>Luc-Store</h1>

      {/* Formulaire d'ajout de produit (uniquement en dev) */}
      {isDev && !editingProduct && (
        <AddProductForm onAddProduct={newProduct => setProducts([newProduct, ...products])} />
      )}

      {/* Formulaire d’édition (uniquement en dev) */}
      {isDev && editingProduct && (
        <EditProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Liste des produits */}
      <ProductList
        products={products}
        isAdmin={isDev}
        showOrderButton={isProd}
        onOrder={handleOrder}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;
