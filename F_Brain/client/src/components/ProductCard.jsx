import React, { useState } from 'react';

const ProductCard = ({
  title,
  images,
  description,
  stock,
  price,
  isAdmin,
  onEdit,
  onOrder,
  showOrderButton
}) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const styles = {
    card: {
      border: '1px solid #ddd',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '5px',
      maxWidth: '700px',
    },
    container: {
      display: 'flex',
      gap: '10px',
    },
    mainImageContainer: {
      width: '400px',
      height: '400px',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#fff',
    },
    mainImage: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      display: 'block',
    },
    thumbnails: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    thumbnail: {
      width: '80px',
      height: '80px',
      objectFit: 'contain',
      cursor: 'pointer',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    activeThumbnail: {
      border: '2px solid #007185',
    },
    buttons: {
      marginTop: '15px',
    },
  };

  return (
    <div className="product-card" style={styles.card}>
      <h2>{title}</h2>
      <div style={styles.container}>
        <div style={styles.mainImageContainer}>
          <img
            src={mainImage}
            alt={title}
            style={styles.mainImage}
          />
        </div>

        <div style={styles.thumbnails}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${title} miniature ${idx + 1}`}
              style={{
                ...styles.thumbnail,
                ...(mainImage === img ? styles.activeThumbnail : {}),
              }}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      <p className="article-description">{description}</p>
      <div className="article-details">
        <p className="stock-info">Stock disponible : {stock}</p>
        <p className="price">Prix HT : {price} €</p>
      </div>

      <div style={styles.buttons}>
        {/* Mode développeur → bouton Éditer */}
        {isAdmin && (
          <button className="edit-button" onClick={onEdit}>Éditer</button>
        )}

        {/* Mode production → bouton Commander */}
        {!isAdmin && showOrderButton && (
          <button
            className="order-button"
            onClick={onOrder}
            disabled={stock === 0}
            style={{
              opacity: stock === 0 ? 0.5 : 1,
              cursor: stock === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            Commander
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
