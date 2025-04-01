import React, { useState } from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, closeModal, onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const allowedTypes = [".pdf", ".txt", ".md", ".mp3"];

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (allowedTypes.includes(`.${fileExtension}`)) {
        setSelectedFile(file);
      } else {
        alert("Formato no permitido. Solo puedes subir PDF, TXT, Markdown o MP3.");
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null);
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">📂 Subir Archivo</h2>

        <label className="file-upload">
          <input
            type="file"
            accept=".pdf, .txt, .md, .mp3"
            onChange={handleFileChange}
            hidden
          />
          📎 Seleccionar Archivo
        </label>

        {selectedFile && <p className="file-name">📄 {selectedFile.name}</p>}

        <div className="modal-buttons">
          <button className="upload-button" onClick={handleUpload} disabled={!selectedFile}>
            🚀 Subir
          </button>
          <button className="close-button" onClick={closeModal}>❌ Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
