import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import NotebookCard from "../components/NotebookCard";
import AuthButton from "../components/AuthButton"; // Importar el componente
import "../App.css";

function NotebookListPage({
  notebooks,
  setNotebooks,
  user,
  setUser,
  handleLogout,
}) {
  const navigate = useNavigate(); // Para redirigir

  const handleNewNotebook = () => {
    const newNotebook = {
      id: notebooks.length + 1,
      title: "Libro vacío",
      items: 0,
      sources: 0,
    };
    setNotebooks([...notebooks, newNotebook]);
  };

  const handleDeleteNotebook = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cuaderno?")) {
      setNotebooks(notebooks.filter((notebook) => notebook.id !== id));
    }
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Redirigir al formulario de registro
  };

  return (
    <div className="notebook-list-page">
      <header className="notebook-list-page__header">
        <div className="notebook-list-page__logo">Notebook</div>
        <div className="notebook-list-page__right-actions">
          <AuthButton
            userEmail={user}
            handleLogout={handleLogout}
            handleRegisterClick={handleRegisterClick}
          />
        </div>
      </header>
      <main className="notebook-list-page__main">
        <h1 className="notebook-list-page__title">Notebook</h1>
        {notebooks.length === 0 ? (
          <div className="notebook-list-page__empty">
            <p>No tienes cuadernos creados.</p>
            <button
              className="notebook-list-page__new-button"
              onClick={handleNewNotebook}
            >
              Crear tu cuaderno
            </button>
          </div>
        ) : (
          <>
            <section className="notebook-list-page__notebooks-section">
              {notebooks.map((notebook) => (
                <NotebookCard
                  key={notebook.id}
                  title={notebook.title}
                  details={`${notebook.items} items • ${notebook.sources} fuentes`}
                  onDelete={() => handleDeleteNotebook(notebook.id)}
                />
              ))}
            </section>
            <button
              className="notebook-list-page__new-button"
              onClick={handleNewNotebook}
            >
              + Nuevo cuaderno
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default NotebookListPage;
