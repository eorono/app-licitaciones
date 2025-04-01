import React, { useState } from "react";
import "../styles/Sidebar.css";
import Modal from "./Modal";

const Sidebar = ({ isExpanded, toggleExpand }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileUpload = (file) => {
    setFiles((prevFiles) => [file, ...prevFiles]);
  };

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

            {}
            <div className="file-container">
              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((file, index) => (
                    <li key={index} className="file-item">📄 {file.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {}
          {files.length === 0 && (
            <p className="info-text">
              Las fuentes guardadas aparecerán aquí. Puedes agregar PDFs, sitios web, textos o archivos de audio.
            </p>
          )}
        </div>
      )}

      {}
      <Modal isOpen={isModalOpen} closeModal={closeModal} onFileUpload={handleFileUpload} />
    </div>
  );
};

export default Sidebar;
