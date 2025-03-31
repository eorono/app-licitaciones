import React, { useState } from "react";
import "../styles/Chat.css";
import Modal from "./Modal";

const Chat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="chat">
      <h2>Chat</h2>
      <div className="upload-section">
        <h3>Añade una fuente para comenzar</h3>
        <button onClick={openModal}>Subir una fuente</button>
      </div>
      <input type="text" placeholder="Escribe un mensaje..." />

      {/* Modal */}
      <Modal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Chat;
