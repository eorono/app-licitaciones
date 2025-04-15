// src/pages/NotebookDetailPage.jsx
import React, { useState } from "react";
import Chat from "../components/Chat";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import Modal from "../components/Modal";
import "../App.css";

const NotebookDetailPage = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isNotesExpanded, setNotesExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFileUpload = (file) => {
    setFiles((prevFiles) => [file, ...prevFiles]);
  };

  return (
    <div className="container">
      <Sidebar 
        isExpanded={isSidebarExpanded} 
        toggleExpand={() => setSidebarExpanded(!isSidebarExpanded)}
        files={files}
        openModal={openModal} 
      />

      <Chat openModal={openModal} />

      <Notes 
        isExpanded={isNotesExpanded} 
        toggleExpand={() => setNotesExpanded(!isNotesExpanded)}
      />

      <Modal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        onFileUpload={handleFileUpload} 
      />
    </div>
  );
};

export default NotebookDetailPage;
