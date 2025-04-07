// src/components/NotebookCard.jsx
import React, { useState } from "react";

/**
 * NotebookCard
 * ------------
 * Componente reutilizable para mostrar la información de un cuaderno.
 *
 * Props:
 * - title: Nombre o título del cuaderno.
 * - details: Texto con detalles (ej. "3 items • 2 fuentes").
 * - icon: Ícono o emoji (opcional).
 * - onDelete: Función a ejecutar al hacer clic en eliminar.
 * - onRename: Función a ejecutar al hacer clic en renombrar.
 */
function NotebookCard({ title, details, icon = "📓", onDelete, onRename }) {
  // Estado para controlar si el menú desplegable está abierto o cerrado
  const [menuOpen, setMenuOpen] = useState(false);

  // Al hacer clic en el botón de tres puntos, invertimos el estado
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

      {/* Contenedor del menú de 3 puntos */}
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
