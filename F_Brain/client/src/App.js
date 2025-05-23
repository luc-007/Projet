import React from 'react';
// Importez les composants nécessaires de react-router-dom v6
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Importez vos composants de page/formulaire
import ArticleList from './components/ArticleList';
import AddArticleForm from './components/AddArticleForm';
import EditArticleForm from './components/EditArticleForm';

function App() {
  return (
    <Router>
      <div>
        {/* Barre de navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Liste des articles</Link>
            </li>
            <li>
              <Link to="/add">Ajouter un article</Link>
            </li>
            {/* Le lien d'édition sera dans la liste des articles */}
          </ul>
        </nav>

        {/* Définition des routes de l'application */}
        {/* Utilisez <Routes> pour envelopper vos <Route> */}
        <Routes>
          {/* Route pour ajouter un article */}
          <Route path="/add" element={<AddArticleForm />} />

          {/* Route pour éditer un article spécifique (avec un paramètre d'ID dans l'URL) */}
          <Route path="/edit/:id" element={<EditArticleForm />} />

          {/* Route pour la page d'accueil (liste des articles) */}
          {/* 'exact' n'est plus nécessaire dans react-router-dom v6 */}
          <Route path="/" element={<ArticleList />} />

          {/* Vous pouvez ajouter une route pour gérer les pages non trouvées (404) si nécessaire */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;