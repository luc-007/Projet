// L'URL de base de votre API backend.
// IMPORTANT : Pour le développement avec Docker Compose, utilisez le chemin relatif /api/.
// Le proxy Nginx (configuré plus tard) redirigera /api/ vers le service backend.
const API_BASE_URL = '/api/';

// Fonction générique pour gérer les réponses API et les erreurs
const handleResponse = async (response) => {
  if (!response.ok) {
    // Tente de lire le corps de la réponse pour obtenir plus de détails sur l'erreur
    const errorDetails = await response.json().catch(() => ({ detail: 'Erreur inconnue de l\'API.' }));
    const errorMessage = errorDetails.detail || `Erreur API: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  // Retourne le corps de la réponse JSON
  return response.json();
};

// Récupérer tous les articles
export const getArticles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}articles/`);
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur dans getArticles:", error);
    throw error; // Propage l'erreur pour être gérée par le composant
  }
};

// Récupérer un article par son ID
export const getArticleById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}articles/${id}/`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Erreur dans getArticleById pour ID ${id}:`, error);
    throw error;
  }
};

// Ajouter un nouvel article
export const addArticle = async (articleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error("Erreur dans addArticle:", error);
    throw error;
  }
};

// Mettre à jour un article existant
export const updateArticle = async (id, articleData) => {
  try {
    const response = await fetch(`${API_BASE_URL}articles/${id}/`, {
      method: 'PUT', // Utilisez 'PUT' pour remplacer l'article entier, 'PATCH' pour une mise à jour partielle
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Erreur dans updateArticle pour ID ${id}:`, error);
    throw error;
  }
};

// Ajoutez d'autres fonctions API ici (par exemple, pour les commandes)
// export const createOrder = async (orderData) => { ... };
