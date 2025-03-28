import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Notes from "./components/Notes";

function App() {
  return (
    <div className="container">
      <Sidebar />
      <Chat />
      <Notes />
    </div>
  );
}

export default App;
