import React, { useState, useEffect } from 'react';

const EditProductForm = ({ product, onSave, onCancel }) => {
  // Initialiser les états avec les données du produit
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [imageURLs, setImageURLs] = useState(['', '', '']);

  // Charger les données du produit au montage ou si produit change
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setDescription(product.description);
      setStock(product.stock);
      setPrice(product.price);
      // Remplir les URLs images (max 3)
      setImageURLs([
        product.images[0] || '',
        product.images[1] || '',
        product.images[2] || '',
      ]);
    }
  }, [product]);

  const handleURLChange = (index, value) => {
    const newURLs = [...imageURLs];
    newURLs[index] = value;
    setImageURLs(newURLs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || stock === '' || price === '') {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const updatedProduct = {
      ...product,
      title,
      description,
      stock: parseInt(stock, 10),
      price: parseFloat(price),
      images: imageURLs.filter(url => url.trim() !== ''),
    };

    onSave(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h2>Modifier le produit</h2>
      <label>
        Titre:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={formStyles.input}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          style={{ ...formStyles.input, height: '80px' }}
        />
      </label>
      <label>
        Stock:
        <input
          type="number"
          value={stock}
          onChange={e => setStock(e.target.value)}
          required
          style={formStyles.input}
          min="0"
        />
      </label>
      <label>
        Prix HT (€):
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
          style={formStyles.input}
          step="0.01"
          min="0"
        />
      </label>

      <p>URLs des images (max 3) :</p>
      {imageURLs.map((url, idx) => (
        <input
          key={idx}
          type="url"
          placeholder={`URL image ${idx + 1}`}
          value={url}
          onChange={e => handleURLChange(idx, e.target.value)}
          style={formStyles.input}
        />
      ))}

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" style={formStyles.button}>
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{ ...formStyles.button, backgroundColor: '#ccc', color: '#333' }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

const formStyles = {
  form: {
    margin: '20px 0',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '700px',
    backgroundColor: '#f9f9f9',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '8px 0 16px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: '#007185',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
};

export default EditProductForm;
