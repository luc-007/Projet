import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, isDeveloperMode, onDeleteProduct }) {
  if (!products || products.length === 0) {
    return (
      <div>
        <p>Aucun produit à afficher.</p>
        {isDeveloperMode && (
          <a href="/add" style={{ display: 'inline-block', marginTop: '10px' }}>
            <button>Ajouter un produit</button>
          </a>
        )}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center'
    }}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => onDeleteProduct(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;