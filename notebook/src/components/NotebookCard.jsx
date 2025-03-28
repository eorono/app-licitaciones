import React from 'react';
import '../App.css';


/**
 * NotebookCard
 * ------------
 * Componente reutilizable para mostrar la información de un cuaderno.
 * 
 * Props esperadas:
 * - title: (string) Nombre o título del cuaderno.
 * - details: (string) Texto con detalles (ej. "3 items • 2 fuentes").
 * - icon: (string o JSX) Ícono o emoji (opcional).
 */
function NotebookCard({ title, details, icon = '📓' }) {
  return (
    <div className="notebook-card">
      {/* Ícono o emoji representativo del cuaderno */}
      <div className="notebook-card__icon">{icon}</div>

      {/* Contenedor de la info textual del cuaderno */}
      <div className="notebook-card__info">
        <h3 className="notebook-card__title">{title}</h3>
        <p className="notebook-card__details">{details}</p>
      </div>
    </div>
  );
}

export default NotebookCard;
