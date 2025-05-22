import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../api/api'; // Assurez-vous de créer ce fichier

function ArticleList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles:", error);
        // Gérer l'erreur (afficher un message à l'utilisateur, etc.)
      }
    };
    fetchArticles();
  }, []);

  // Logique pour déterminer si l'utilisateur est le développeur (simplifié)
  const isDeveloper = true; // Remplacez par votre logique d'authentification/autorisation

  return (
    <div>
      <h2>Liste des articles</h2>
      {articles.length > 0 ? (
        <ul>
          {articles.map(article => (
            <li key={article.id}>
              {article.name} - {article.price} €
              {isDeveloper && (
                <Link to={`/edit/${article.id}`}>
                  <button>Éditer</button>
                </Link>
              )}
              {!isDeveloper && (
                <button>Commander</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun article disponible pour le moment.</p>
      )}
    </div>
  );
}

export default ArticleList;