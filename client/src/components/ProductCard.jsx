// Ceci est un fichier placeholder.
// L'utilisateur doit fournir son propre contenu pour ProductCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, isDeveloperMode, onDeleteProduct }) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px',
    width: '250px', // Largeur fixe pour la carte
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const imageStyle = {
    width: '100%',
    maxHeight: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '10px'
  };
  
  const defaultImage = 'https://via.placeholder.com/250x150.png?text=Image+Non+Disponible';


  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const descriptionStyle = {
    fontSize: '0.9em',
    color: '#555',
    flexGrow: 1, // Pour que la description prenne l'espace disponible
    marginBottom: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 3, // Limite à 3 lignes
    WebkitBoxOrient: 'vertical'
  };

  const priceStyle = {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '10px'
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 'auto' // Pousse les boutons vers le bas
  };

  const buttonStyle = {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center'
  };

  const editButtonStyle = { ...buttonStyle, backgroundColor: '#ffc107', color: 'black' };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#dc3545', color: 'white' };
  const orderButtonStyle = { ...buttonStyle, backgroundColor: '#28a745', color: 'white', width: '100%' };


  return (
    <div style={cardStyle}>
      <img 
        src={product.image_url || defaultImage} 
        alt={product.name} 
        style={imageStyle} 
        onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }} // Fallback si l'URL est invalide
      />
      <h3 style={titleStyle}>{product.name}</h3>
      <p style={descriptionStyle}>{product.description || "Pas de description disponible."}</p>
      <p style={priceStyle}>{product.price} €</p>
      <div style={buttonContainerStyle}>
        {isDeveloperMode ? (
          <>
            <Link to={`/edit/${product.id}`} style={editButtonStyle}>Éditer</Link>
            <button onClick={() => onDeleteProduct(product.id)} style={deleteButtonStyle}>Supprimer</button>
          </>
        ) : (
          <button style={orderButtonStyle} onClick={() => alert(`Commande pour ${product.name} simulée!`)}>Commander</button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

