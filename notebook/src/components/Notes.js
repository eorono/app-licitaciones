import "../styles/Notes.css";

const Notes = ({ isExpanded, toggleExpand }) => {
  return (
    <div className={`notes ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="toggle-button" onClick={toggleExpand}>
        {isExpanded ? "⬅" : "➡"}
      </button>

      {isExpanded && (
        <>
          {}
          <h2 className="section-title">Studio</h2>

          {}
          <div className="audio-summary">
            <h3>Resumen de audio</h3>
            <div className="audio-card">
              <div className="audio-info">
                <span className="audio-title">🎙️ Conversación en profundidad</span>
                <span className="audio-subtitle">Dos anfitriones (solo en inglés)</span>
              </div>
              <div className="audio-buttons">
                <button className="customize-button">Personalizar</button>
                <button className="generate-button" disabled>Generar</button>
              </div>
            </div>
          </div>

          {}
          <div className="notes-section">
            <h3>Notas</h3>
            <button className="add-note">+ Añadir nota</button>

            {}
            <div className="notes-categories">
              <button className="category-button">📚 Guía de estudio</button>
              <button className="category-button">📄 Documento de resumen</button>
              <button className="category-button">❓ Preguntas frecuentes</button>
              <button className="category-button">📊 Cronología</button>
            </div>

            {}
            <ul className="notes-list">
              <li className="note-item">📝 Nota nueva</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Notes;