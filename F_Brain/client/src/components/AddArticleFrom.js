import React, { useState } from 'react';
import { addArticle } from '../api/api'; // Assurez-vous de créer ce fichier
import { useHistory } from 'react-router-dom'; // Pour la redirection

function AddArticleForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const history = useHistory(); // Hook pour la navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addArticle({ name, price });
      // Rediriger vers la liste des articles après succès
      history.push('/');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'article:", error);
      // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
    }
  };

  return (
    <div>
      <h2>Ajouter un article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddArticleForm;