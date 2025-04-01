// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotebookListPage from "./pages/NotebookListPage";
import RegisterPage from "./pages/RegisterPage"; // Importamos la página de registro
import "./App.css";

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [user, setUser] = useState(null); // Para manejar el estado del usuario autenticado

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NotebookListPage
              notebooks={notebooks}
              setNotebooks={setNotebooks}
              user={user}
              setUser={setUser} // Pasar la función para setear el usuario
            />
          }
        />
        <Route
          path="/register"
          element={<RegisterPage setUser={setUser} />} // Agregar la página de registro
        />
      </Routes>
    </Router>
  );
}

export default App;
