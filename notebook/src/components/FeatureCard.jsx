import React from 'react';
import '../App.css';


/**
 * FeatureCard
 * -----------
 * Componente reutilizable para mostrar una "tarjeta de funcionalidad" o "feature".
 * 
 * Props esperadas:
 * - title: (string) Título de la tarjeta.
 * - description: (string) Descripción del feature.
 */
function FeatureCard({ title, description }) {
  return (
    <div className="feature-card">
      {/* Título de la tarjeta */}
      <h3 className="feature-card__title">{title}</h3>
      
      {/* Descripción o texto principal */}
      <p className="feature-card__description">{description}</p>
    </div>
  );
}

export default FeatureCard;
