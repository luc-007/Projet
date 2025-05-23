import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../api/api';

// Assurez-vous que ces chemins correspondent aux images dans client/public/images/
const placeholderImages = [
  '/images/img1.png', // Image principale par défaut
  '/images/img2.png', // Miniature 1
  '/images/img3.jpg', // Miniature 2
  // Ajoutez d'autres placeholders si vous voulez plus de miniatures
];

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // État pour gérer l'image principale affichée pour chaque article
  const [mainImages, setMainImages] = useState({});

  // État pour gérer la visibilité et la position de l'effet de zoom pour chaque article
  // Clé : ID de l'article, Valeur : { visible: boolean, x: number, y: number, bgPosX: number, bgPosY: number }
  const [zoomState, setZoomState] = useState({});


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);

        // Initialise l'état mainImages et zoomState pour chaque article
        const initialMainImages = {};
        const initialZoomState = {};
        data.forEach(article => {
          initialMainImages[article.id] = (article.images && article.images.length > 0)
                                            ? article.images[0]
                                            : placeholderImages[0];
          initialZoomState[article.id] = { visible: false, x: 0, y: 0, bgPosX: 0, bgPosY: 0 };
        });
        setMainImages(initialMainImages);
        setZoomState(initialZoomState);

      } catch (err) {
        setError("Impossible de charger les articles. Assurez-vous que le backend est en cours d'exécution et accessible.");
        console.error("Erreur lors de la récupération des articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const isDeveloper = false; // Défini sur false pour simuler un utilisateur public

  const handleThumbnailClick = (articleId, imageUrl) => {
    console.log("Miniature cliquée pour l'article", articleId, "URL:", imageUrl);
    setMainImages(prev => ({
      ...prev,
      [articleId]: imageUrl
    }));
    // Optionnel: Mettre à jour la classe 'active' sur la miniature cliquée (nécessite de gérer l'état actif des miniatures)
  };

  // Fonction pour gérer le mouvement de la souris sur l'image principale (pour le zoom)
  const handleMouseMove = (articleId, e) => {
    const mainImageElement = e.target; // L'élément image sur lequel la souris bouge
    const bounding = mainImageElement.getBoundingClientRect();
    const x = e.clientX - bounding.left; // Position X relative à l'image
    const y = e.clientY - bounding.top; // Position Y relative à l'image

    // Calcul de la position du background pour l'effet de zoom
    const bgPosX = (x / bounding.width) * 100;
    const bgPosY = (y / bounding.height) * 100;

    setZoomState(prevZoomState => ({
      ...prevZoomState,
      [articleId]: {
        visible: true,
        // Positionne l'élément de zoom à la position de la souris
        // Vous devrez ajuster le positionnement CSS de .image-zoom
        // pour qu'il soit positionné absolument par rapport à un conteneur
        // et centré sur le curseur.
        x: e.clientX, // Position X de la souris dans la fenêtre
        y: e.clientY, // Position Y de la souris dans la fenêtre
        bgPosX: bgPosX, // Position X du background en pourcentage
        bgPosY: bgPosY  // Position Y du background en pourcentage
      }
    }));
  };

  // Fonction pour gérer la sortie de la souris de l'image principale (pour le zoom)
  const handleMouseLeave = (articleId) => {
    setZoomState(prevZoomState => ({
      ...prevZoomState,
      [articleId]: { ...prevZoomState[articleId], visible: false }
    }));
  };


  if (loading) return <p>Chargement des articles...</p>;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>;

  return (
    <div>
      <h1>Luc-Store</h1>
      <h2>Liste des articles</h2>

      <div className="article-grid">
        {articles.length > 0 ? (
          articles.map(article => {
            // Crée un tableau de toutes les URLs d'images pour cet article (y compris l'image principale)
            const allImages = (article.images && article.images.length > 0)
                              ? article.images
                              : placeholderImages;

            return (
              <div key={article.id} className="article-item">
                <h2>{article.name}</h2>
                {/* Conteneur principal pour les images (pour flexbox) */}
                <div className="article-images">
                  {/* Conteneur pour les miniatures */}
                  <div className="thumbnail-images">
                     {/* Affiche TOUTES les miniatures */}
                     {allImages.map((imageUrl, index) => (
                         <div
                           key={index}
                           className={`thumbnail ${mainImages[article.id] === imageUrl ? 'active' : ''}`} // Ajoute la classe active
                           onClick={() => handleThumbnailClick(article.id, imageUrl)}
                         >
                           <img
                                src={imageUrl}
                                alt={`Miniature ${index + 1} de ${article.name}`}
                           />
                         </div>
                     ))}
                  </div>
                   {/* Conteneur de l'image principale et de l'effet de zoom */}
                   <div className="main-image-container"
                        onMouseMove={(e) => handleMouseMove(article.id, e)}
                        onMouseLeave={() => handleMouseLeave(article.id)}
                   >
                      {/* Image principale affichée */}
                      <img
                          src={mainImages[article.id] || placeholderImages[0]}
                          alt={`Image principale de ${article.name}`}
                          className="main-image"
                      />
                      {/* Élément pour l'effet de zoom */}
                      {zoomState[article.id]?.visible && (
                          <div
                              className="image-zoom"
                              style={{
                                  backgroundImage: `url(${mainImages[article.id] || placeholderImages[0]})`,
                                  backgroundSize: '200% 200%', // Facteur de zoom (ajustez si nécessaire)
                                  backgroundPosition: `${zoomState[article.id].bgPosX}% ${zoomState[article.id].bgPosY}%`,
                                  display: 'block',
                                  // Positionnement de l'élément de zoom (ajustez si nécessaire)
                                  left: `${zoomState[article.id].x}px`,
                                  top: `${zoomState[article.id].y}px`,
                              }}
                          ></div>
                      )}
                   </div>
                </div>
                <p className="article-description">{article.description || "Pas de description disponible."}</p>
                <div className="article-details">
                  <p className="stock-info">Stock disponible : {article.stock !== undefined ? article.stock : 'N/A'}</p>
                  <p className="price">Prix HT : {article.price !== undefined ? article.price.toFixed(2) : 'N/A'} €</p>
                </div>
                {isDeveloper ? (
                  <Link to={`/edit/${article.id}`}>
                    <button>Éditer</button>
                  </Link>
                ) : (
                  <button>Commander</button>
                )}
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Aucun article disponible pour le moment.</p>
        )}
      </div>
    </div>
  );
}

export default ArticleList;