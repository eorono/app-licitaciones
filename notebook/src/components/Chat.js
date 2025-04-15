import React from "react";
import "../App.css";

const Chat = ({ openModal }) => {
  return (
    <div className="chat">
      <h2>Chat</h2>
      <div className="upload-section">
        <h3>Añade una fuente para comenzar</h3>
        <button className="button-dark" onClick={openModal}>
  Subir una fuente
</button>

      </div>
      <input type="text" placeholder="Escribe un mensaje..." />
    </div>
  );
};

export default Chat;
