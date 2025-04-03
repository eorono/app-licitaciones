import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ isExpanded, toggleExpand, files, openModal }) => {
  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="toggle-button" onClick={toggleExpand}>
        {isExpanded ? "⬅" : "➡"}
      </button>

      {isExpanded && (
        <div className="content-wrapper">
          <div>
            <div className="top-content">
              <h2>Fuentes</h2>
              <button className="add-source" onClick={openModal}>
                + Añadir fuente
              </button>
            </div>

            <div className="file-container">
              {files.length > 0 ? (
                <ul className="file-list">
                  {files.map((file, index) => (
                    <li key={index} className="file-item">📄 {file.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="info-text">
                  Las fuentes guardadas aparecerán aquí. Puedes agregar PDFs, sitios web, textos o archivos de audio.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
