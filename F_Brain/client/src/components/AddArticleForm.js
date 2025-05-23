import React, { useState } from 'react';
import { addArticle } from '../api/api';
import { useNavigate } from 'react-router-dom';

function AddArticleForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  // Ajoutez des états pour les URLs des images (par exemple, un tableau de chaînes)
  const [imageUrls, setImageUrls] = useState(['', '', '']); // 3 champs pour 3 images
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Gère le changement dans les champs d'URL d'image
  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Filtre les URLs vides avant d'envoyer
    const validImageUrls = imageUrls.filter(url => url.trim() !== '');

    const articleData = {
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock, 10),
      images: validImageUrls // Inclut le tableau d'URLs d'images
    };

    try {
      await addArticle(articleData);
      navigate('/');
    } catch (err) {
      setError("Erreur lors de l'ajout de l'article. Veuillez réessayer.");
      console.error("Erreur lors de l'ajout de l'article:", err);
    }
  };

  return (
    <div>
      <h2>Ajouter un article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="price">Prix:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.01" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input type="number" id="stock" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" />
        </div>

        {/* Champs pour les URLs des images */}
        <h3>Images (URLs)</h3>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <label htmlFor={`imageUrl${index}`}>Image {index + 1} URL:</label>
            <input
              type="text"
              id={`imageUrl${index}`}
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
            />
          </div>
        ))}

        <button type="submit">Ajouter l'article</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default AddArticleForm;