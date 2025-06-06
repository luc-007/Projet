// Ceci est un fichier placeholder.
// L'utilisateur doit fournir son propre contenu pour AddProductForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image_url, setImageUrl] = useState(''); // Champ pour l'URL de l'image
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
        alert("Le nom et le prix sont requis.");
        return;
    }
    const success = await onAddProduct({ name, description, price: parseFloat(price), image_url });
    if (success) {
      // Réinitialiser le formulaire (optionnel)
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      navigate('/'); // Rediriger vers la liste des produits après l'ajout
    } else {
      alert("Échec de l'ajout du produit.");
    }
  };
  
  const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' };
  const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ddd' };
  const buttonStyle = { padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };


  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Ajouter un Nouveau Produit</h2>
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
      <button type="submit" style={buttonStyle}>Ajouter Produit</button>
    </form>
  );
}

export default AddProductForm;

