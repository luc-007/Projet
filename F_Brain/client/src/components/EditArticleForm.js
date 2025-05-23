import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticle } from '../api/api';

function EditArticleForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  // Ajoutez un état pour les URLs des images (similaire à AddArticleForm)
  const [imageUrls, setImageUrls] = useState(['', '', '']); // Initialisez avec des chaînes vides ou les URLs existantes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const article = await getArticleById(id);
        setName(article.name);
        setPrice(article.price);
        setDescription(article.description || '');
        setStock(article.stock !== undefined ? article.stock : '');
        // Chargez les URLs d'images existantes si l'article en a
        if (article.images && article.images.length > 0) {
          // Remplissez imageUrls avec les URLs existantes (jusqu'à 3)
          const existingUrls = article.images.slice(0, 3);
          // Complétez avec des chaînes vides si moins de 3 images
          while (existingUrls.length < 3) {
            existingUrls.push('');
          }
          setImageUrls(existingUrls);
        } else {
          // Si pas d'images, initialisez avec des chaînes vides
          setImageUrls(['', '', '']);
        }

      } catch (err) {
        setError("Impossible de charger l'article pour édition.");
        console.error("Erreur lors de la récupération de l'article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

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

    const updatedArticleData = {
      name,
      price: parseFloat(price),
      description,
      stock: parseInt(stock, 10),
      images: validImageUrls // Inclut le tableau d'URLs d'images mis à jour
    };

    try {
      await updateArticle(id, updatedArticleData);
      navigate('/');
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'article. Veuillez réessayer.");
      console.error("Erreur lors de la mise à jour de l'article:", err);
    }
  };

  if (loading) return <p>Chargement de l'article...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div>
      <h2>Éditer l'article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="edit-name">Nom:</label>
          <input type="text" id="edit-name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="edit-price">Prix:</label>
          <input type="number" id="edit-price" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.01" />
        </div>
         <div>
          <label htmlFor="edit-description">Description:</label>
          <textarea id="edit-description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div>
          <label htmlFor="edit-stock">Stock:</label>
          <input type="number" id="edit-stock" value={stock} onChange={(e) => setStock(e.target.value)} required min="0" />
        </div>

        {/* Champs pour les URLs des images (similaire à AddArticleForm) */}
        <h3>Images (URLs)</h3>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <label htmlFor={`editImageUrl${index}`}>Image {index + 1} URL:</label>
            <input
              type="text"
              id={`editImageUrl${index}`}
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
            />
          </div>
        ))}

        <button type="submit">Mettre à jour l'article</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default EditArticleForm;