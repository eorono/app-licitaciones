// src/components/NotebookCard.jsx
import React, { useState } from "react";

/**
 * NotebookCard
 * Muestra la información de un cuaderno y permite eliminar o renombrarlo mediante un menú desplegable.
 */
function NotebookCard({ title, details, icon = "📓", onDelete, onRename }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle del menú desplegable
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="notebook-card">
      <div className="notebook-card__icon">{icon}</div>
      <div className="notebook-card__info">
        <h3 className="notebook-card__title">{title}</h3>
        <p className="notebook-card__details">{details}</p>
      </div>

      {/* Menú desplegable de opciones */}
      <div className="notebook-card__menu-container">
        <button
          className="notebook-card__menu-button"
          onClick={handleMenuToggle}
        >
          ...
        </button>

        {menuOpen && (
          <div className="notebook-card__menu-dropdown">
            <button onClick={onDelete}>Eliminar</button>
            <button onClick={onRename}>Renombrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotebookCard;
