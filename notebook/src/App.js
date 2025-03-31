// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotebookListPage from "./pages/NotebookListPage";
import "./App.css";

function App() {
  // Estado que guarda la lista de cuadernos
  const [notebooks, setNotebooks] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <NotebookListPage
              notebooks={notebooks}
              setNotebooks={setNotebooks}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
