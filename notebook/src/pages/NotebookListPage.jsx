// src/pages/NotebookListPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import NotebookCard from "../components/NotebookCard";
import NotebookFilters from "../components/NotebookFilters";
import "../App.css";

function NotebookListPage({ notebooks, setNotebooks, user, setUser }) {
  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState("recent");

  useEffect(() => {
    if (!user) {
      setNotebooks([]);
      return;
    }
    fetch(`http://localhost:5000/books?email=${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.books) {
          const loadedNotebooks = data.books.map((b) => ({
            id: b.id,
            title: b.titulo,
            items: 0,
            sources: 0,
          }));
          setNotebooks(loadedNotebooks);
        } else {
          console.log(data.message || "Error al cargar cuadernos");
          setNotebooks([]);
        }
      })
      .catch((err) => {
        console.log("Hubo un problema al cargar cuadernos", err);
        setNotebooks([]);
      });
  }, [user, setNotebooks]);

  const sortedNotebooks = useMemo(() => {
    if (filterOption === "recent") {
      // Ordenar por id descendente (más reciente primero)
      return [...notebooks].sort((a, b) => b.id - a.id);
    } else if (filterOption === "title") {
      // Ordenar alfabéticamente por título
      return [...notebooks].sort((a, b) => a.title.localeCompare(b.title));
    }
    // Si deseas un comportamiento por defecto si no es ninguno de los anteriores:
    return notebooks;
  }, [filterOption, notebooks]);

  const handleNewNotebook = async () => {
    if (!user) {
      alert("Inicia sesión antes");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user }),
      });
      const data = await response.json();
      if (response.ok) {
        const newNotebook = {
          id: data.bookId,
          title: "Untitled notebook",
          items: 0,
          sources: 0,
        };
        setNotebooks([...notebooks, newNotebook]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Error al crear el cuaderno en la base de datos");
    }
  };

  const handleDeleteNotebook = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este cuaderno?")) {
      try {
        const response = await fetch(`http://localhost:5000/books/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        if (response.ok) {
          setNotebooks(notebooks.filter((nb) => nb.id !== id));
        } else {
          alert(data.message || "Error al eliminar el cuaderno");
        }
      } catch (err) {
        alert("Hubo un problema al eliminar el cuaderno en la base de datos");
      }
    }
  };

  const handleRenameNotebook = async (id) => {
    const newTitle = prompt("Ingresa el nuevo título:");
    if (!newTitle) return;
    try {
      const response = await fetch(`http://localhost:5000/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      const data = await response.json();
      if (response.ok) {
        setNotebooks(
          notebooks.map((nb) =>
            nb.id === id ? { ...nb, title: newTitle } : nb
          )
        );
      } else {
        alert(data.message || "Error al renombrar el cuaderno");
      }
    } catch (err) {
      alert("Hubo un problema al renombrar el cuaderno en la base de datos");
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUser(null);
  };

  return (
    <div className="notebook-list-page">
      <header className="notebook-list-page__header">
        <div className="notebook-list-page__logo">Notebook</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <NotebookFilters
            filterOption={filterOption}
            setFilterOption={setFilterOption}
          />
          <div className="notebook-list-page__right-actions">
            {user ? (
              <>
                <span>{user}</span>
                <button
                  className="notebook-list-page__config-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="notebook-list-page__config-button"
                  onClick={handleLoginClick}
                >
                  Iniciar Sesión
                </button>
                <button
                  className="notebook-list-page__config-button"
                  onClick={handleRegisterClick}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="notebook-list-page__main">
        <h1 className="notebook-list-page__title">Notebook</h1>
        {sortedNotebooks.length === 0 ? (
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
              {sortedNotebooks.map((notebook) => (
                <NotebookCard
                  key={notebook.id}
                  title={notebook.title}
                  details={`${notebook.items} items • ${notebook.sources} fuentes`}
                  onDelete={() => handleDeleteNotebook(notebook.id)}
                  onRename={() => handleRenameNotebook(notebook.id)}
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
