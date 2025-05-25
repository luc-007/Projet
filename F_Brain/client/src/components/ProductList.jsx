// src/components/ProductList.jsx

import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, isAdmin, showOrderButton, onOrder, onEdit }) {
  if (products.length === 0) {
    return <p>Aucun produit disponible.</p>;
  }

  return (
    <div className="article-grid">
      {products.map((product, idx) => (
        <ProductCard
          key={idx}
          {...product}
          isAdmin={isAdmin}
          showOrderButton={showOrderButton}
          onOrder={() => onOrder(product.title)}
          onEdit={() => onEdit(product)}
        />
      ))}
    </div>
  );
}

export default ProductList;
