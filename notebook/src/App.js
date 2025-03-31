import { useState } from "react";
import Chat from "./components/Chat";
import Notes from "./components/Notes";
import Sidebar from "./components/Sidebar";
import "./styles/App.css";

const App = () => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);
  const [isNotesExpanded, setNotesExpanded] = useState(true);

  return (
    <div className="container">
      <Sidebar isExpanded={isSidebarExpanded} toggleExpand={() => setSidebarExpanded(!isSidebarExpanded)} />
      <Chat />
      <Notes isExpanded={isNotesExpanded} toggleExpand={() => setNotesExpanded(!isNotesExpanded)} />
    </div>
  );
};

export default App;
