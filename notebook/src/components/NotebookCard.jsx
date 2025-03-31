// src/components/NotebookCard.jsx
import React from "react";

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
 */
function NotebookCard({ title, details, icon = "📓", onDelete }) {
  return (
    <div className="notebook-card">
      <div className="notebook-card__icon">{icon}</div>
      <div className="notebook-card__info">
        <h3 className="notebook-card__title">{title}</h3>
        <p className="notebook-card__details">{details}</p>
      </div>
      {onDelete && (
        <button className="notebook-card__delete-button" onClick={onDelete}>
          Eliminar
        </button>
      )}
    </div>
  );
}

export default NotebookCard;
