import React from 'react';
import "../styles/Modal.css";

const Modal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Modal</h2>
        <p>Este es un modal vacío. Aquí puedes agregar cualquier contenido.</p>
        <button className="close-button" onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
