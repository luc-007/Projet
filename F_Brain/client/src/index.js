import React from 'react';
import ReactDOM from 'react-dom/client'; // Pour React 18+
import './index.css'; // Si create-react-app a généré un fichier CSS global
import App from './App';
import reportWebVitals from './reportWebVitals'; // Pour mesurer les performances (optionnel)

// Trouve l'élément HTML où l'application React sera rendue
const container = document.getElementById('root');
// Crée une racine React pour le rendu (nouvelle API dans React 18+)
const root = ReactDOM.createRoot(container); // Pour React 18+

// Rend le composant App à l'intérieur du mode StrictMode de React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();