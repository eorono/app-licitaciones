// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotebookListPage from "./pages/NotebookListPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotebookDetailPage from "./pages/NotebookDetailPage"; // Importa la nueva vista
import "./App.css";

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [user, setUser] = useState(null);

  // Al montar la app, lee el email almacenado en localStorage (para mantener la sesión)
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUser(storedEmail);
    }
  }, []);

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
              setUser={setUser}
            />
          }
        />
        {/* Ruta para la vista de detalle de un cuaderno */}
        <Route path="/notebook/:id" element={<NotebookDetailPage />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
