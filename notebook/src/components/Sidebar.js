import React, { useState } from "react";
import "../styles/Sidebar.css";
import Modal from "./Modal";

const Sidebar = ({ isExpanded, toggleExpand }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="toggle-button" onClick={toggleExpand}>
        {isExpanded ? "⬅" : "➡"}
      </button>
      {isExpanded && (
        <>
          <div className="top-content">
            <h2>Fuentes</h2>
            <button className="add-source" onClick={openModal}>
              + Añadir fuente
            </button>
          </div>
          <div className="spacer"></div>
          <p className="info-text">
            Las fuentes guardadas aparecerán aquí. Puedes agregar PDFs, sitios
            web, textos o archivos de audio.
          </p>
        </>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Sidebar;
