// src/components/FeatureCard.jsx
import React from "react";

/**
 * FeatureCard
 * Muestra una tarjeta con título y descripción.
 */
function FeatureCard({ title, description }) {
  return (
    <div className="feature-card">
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </div>
  );
}

export default FeatureCard;
