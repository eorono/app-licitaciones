import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NotebookCard from "../components/NotebookCard";
import "../App.css";

function NotebookListPage({ notebooks, setNotebooks, user, setUser }) {
  const navigate = useNavigate();

  // 1. Cargar cuadernos al montar o cuando cambie 'user'
  useEffect(() => {
    if (!user) {
      // Si no hay usuario, limpiamos la lista de cuadernos
      setNotebooks([]);
      return;
    }
    // Si hay usuario, pedimos los cuadernos al backend
    fetch(`http://localhost:5000/books?email=${user}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.books) {
          // Actualizamos el estado con los cuadernos
          const loadedNotebooks = data.books.map((b) => ({
            id: b.id,
            title: b.titulo,
            items: 0,
            sources: 0,
          }));
          setNotebooks(loadedNotebooks);
        } else {
          // Si hay error, quizás data.message
          console.log(data.message || "Error al cargar cuadernos");
          setNotebooks([]);
        }
      })
      .catch((err) => {
        console.log("Hubo un problema al cargar cuadernos", err);
        setNotebooks([]);
      });
  }, [user, setNotebooks]);

  // 2. Resto de las funciones (crear, eliminar, renombrar, etc.)
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
          setNotebooks(notebooks.filter((notebook) => notebook.id !== id));
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
          notebooks.map((notebook) =>
            notebook.id === id ? { ...notebook, title: newTitle } : notebook
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
