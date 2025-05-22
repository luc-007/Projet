import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, updateArticle } from '../api/api'; // Assurez-vous de créer ce fichier

function EditArticleForm() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticleById(id);
      setName(article.name);
      setPrice(article.price);
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateArticle(id, { name, price });
    // Rediriger ou afficher un message de succès
  };

  return (
    <div>
      <h2>Éditer l'article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
}

export default EditArticleForm;