import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos nuestras páginas
import WelcomePage from './pages/WelcomePage';
import NotebookListPage from './pages/NotebookListPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Página de inicio / */}
        <Route path="/" element={<WelcomePage />} />

        {/* Página de lista de cuadernos /notebooks */}
        <Route path="/notebooks" element={<NotebookListPage />} />

        {/* Agrega más rutas si lo necesitas */}
      </Routes>
    </Router>
  );
}

export default App;
