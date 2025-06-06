// Ceci est un fichier placeholder.
// L'utilisateur doit fournir son propre contenu pour EditProductForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditProductForm({ products, onUpdateProduct }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImageUrl] = useState('');

  useEffect(() => {
    const productToEdit = products.find(p => p.id === parseInt(productId));
    if (productToEdit) {
      setName(productToEdit.name);
      setDescription(productToEdit.description);
      setPrice(productToEdit.price.toString());
      setImageUrl(productToEdit.image_url || '');
    } else if (products.length > 0) { // Si les produits sont chargés mais celui-ci n'est pas trouvé
        alert("Produit non trouvé. Redirection...");
        navigate('/');
    }
    // Si products est vide, on attend qu'App.jsx les charge.
  }, [productId, products, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
        alert("Le nom et le prix sont requis.");
        return;
    }
    const success = await onUpdateProduct(parseInt(productId), { name, description, price: parseFloat(price), image_url });
    if (success) {
      navigate('/'); // Rediriger vers la liste des produits après la mise à jour
    } else {
      alert("Échec de la mise à jour du produit.");
    }
  };

  const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' };
  const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ddd' };
  const buttonStyle = { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

  if (products.length > 0 && !products.find(p => p.id === parseInt(productId))) {
    return <p>Chargement du produit ou produit non trouvé...</p>;
  }


  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Modifier le Produit</h2>
      <div>
        <label htmlFor="name">Nom du produit:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyle} />
      </div>
      <div>
        <label htmlFor="price">Prix:</label>
        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required style={inputStyle} />
      </div>
      <div>
        <label htmlFor="image_url">URL de l'image (optionnel):</label>
        <input type="text" id="image_url" value={image_url} onChange={(e) => setImageUrl(e.target.value)} style={inputStyle} />
      </div>
      <button type="submit" style={buttonStyle}>Mettre à Jour</button>
    </form>
  );
}

export default EditProductForm;

