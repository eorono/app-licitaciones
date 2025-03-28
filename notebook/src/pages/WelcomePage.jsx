import React from "react";
import { useNavigate } from "react-router-dom"; // si vas a usar React Router
import FeatureCard from "../components/FeatureCard"; // Importamos componente reutilizable
import "../App.css";

/**
 * WelcomePage
 * -----------
 * Pantalla de bienvenida que muestra un título, descripción y
 * tarjetas de características (FeatureCard).
 */
function WelcomePage() {
  const navigate = useNavigate(); // Hook de React Router para navegar

  // Maneja el evento de hacer clic en "Crear tu cuaderno"
  const handleCreateNotebook = () => {
    // Navegamos a la ruta donde se listan los cuadernos
    navigate("/notebooks");
  };

  return (
    <div className="welcome-page">
      {/* HEADER */}
      <header className="welcome-page__header">
        <div className="welcome-page__logo">NotebookLM</div>
        <button className="welcome-page__config-button">Configuraciones</button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="welcome-page__main">
        <h1 className="welcome-page__title">
          Te damos la bienvenida a NotebookLM
        </h1>
        <h2 className="welcome-page__subtitle">Crea tu primer cuaderno</h2>
        <p className="welcome-page__description">
          NotebookLM es un asistente de investigación y escritura basado en IA
          que funciona mejor con las fuentes que subes.
        </p>

        {/* Sección de features: usamos 3 FeatureCard */}
        <div className="welcome-page__features">
          <FeatureCard
            title="Un bot de chat basado en tus fuentes documentales"
            description="Sube tus documentos y NotebookLM responderá tus preguntas basándose en la información que contengan."
          />
          <FeatureCard
            title="Amplía tus conocimientos sobre cualquier documento"
            description="Investiga, profundiza y encuentra respuestas precisas consultando tu contenido."
          />
          <FeatureCard
            title="Comparte tu información valiosa"
            description="Añade tus propias notas y resúmenes, y comparte la información con tu equipo."
          />
        </div>

        <button
          className="welcome-page__create-button"
          onClick={handleCreateNotebook}
        >
          Crear tu cuaderno
        </button>
      </main>
    </div>
  );
}

export default WelcomePage;
