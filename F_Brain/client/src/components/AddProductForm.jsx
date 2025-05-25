import React, { useState } from 'react';

const AddProductForm = ({ onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imageURLs, setImageURLs] = useState(['', '', '']);

  // Convertit les fichiers locaux en URLs pour l’aperçu et stockage temporaire
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImageFiles(files);
  };

  const handleURLChange = (index, value) => {
    const newURLs = [...imageURLs];
    newURLs[index] = value;
    setImageURLs(newURLs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crée un tableau d’images combinant fichiers locaux (convertis en URL) et URLs externes
    const localImagesURLs = imageFiles.map(file => URL.createObjectURL(file));
    const allImages = [...localImagesURLs, ...imageURLs.filter(url => url.trim() !== '')].slice(0, 3);

    if (!title || !description || !stock || !price || allImages.length === 0) {
      alert('Veuillez remplir tous les champs et ajouter au moins une image.');
      return;
    }

    const newProduct = {
      title,
      description,
      stock: parseInt(stock),
      price: parseFloat(price),
      images: allImages,
    };

    onAddProduct(newProduct);

    // Reset form
    setTitle('');
    setDescription('');
    setStock('');
    setPrice('');
    setImageFiles([]);
    setImageURLs(['', '', '']);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles.form}>
      <h2>Ajouter un produit</h2>
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

      <label>
        Images (max 3 fichiers locaux):
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          style={formStyles.input}
        />
      </label>

      <p>Ou saisissez jusqu’à 3 URLs d’images :</p>
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

      <button type="submit" style={formStyles.button}>Ajouter le produit</button>
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

export default AddProductForm;
