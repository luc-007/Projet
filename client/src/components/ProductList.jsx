// Ceci est un fichier placeholder.
// L'utilisateur doit fournir son propre contenu pour ProductList.jsx

import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, isDeveloperMode, onDeleteProduct }) {
  const listStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px', // Espace entre les cartes
    justifyContent: 'center' // Centre les cartes si elles ne remplissent pas toute la ligne
  };
  
  if (!products || products.length === 0) {
    return <p>Aucun produit à afficher. Le développeur peut en ajouter via le bouton "Ajouter Produit".</p>;
  }

  return (
    <div>
      <h2>Liste des Produits</h2>
      <div style={listStyle}>
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isDeveloperMode={isDeveloperMode}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;

