import React from "react";
import NotebookCard from "../components/NotebookCard"; // Importamos componente reutilizable
import "../App.css";

/**
 * NotebookListPage
 * ----------------
 * Pantalla que muestra la lista de cuadernos disponibles.
 * Utiliza NotebookCard para cada cuaderno.
 */
function NotebookListPage() {
  return (
    <div className="notebook-list-page">
      {/* HEADER */}
      <header className="notebook-list-page__header">
        <div className="notebook-list-page__logo">NotebookLM</div>
        <div className="notebook-list-page__right-actions">
          <button className="notebook-list-page__config-button">
            Configuraciones
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="notebook-list-page__main">
        <h1 className="notebook-list-page__title">
          Te damos la bienvenida a NotebookLM
        </h1>

        {/* Sección donde listamos los cuadernos */}
        <section className="notebook-list-page__notebooks-section">
          {/* Ejemplo de un solo cuaderno. Podrías mapear un array de cuadernos aquí. */}
          <NotebookCard
            title="Untitled notebook"
            details="3 items • 2 fuentes"
          />
          <NotebookCard
            title="Proyecto de investigación"
            details="5 items • 1 fuente"
            icon="📑"
          />
        </section>

        {/* Botón para crear un nuevo cuaderno (podrías abrir un modal o navegar a otra ruta) */}
        <button className="notebook-list-page__new-button">
          + Nuevo cuaderno
        </button>
      </main>
    </div>
  );
}

export default NotebookListPage;
