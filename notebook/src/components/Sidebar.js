import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-content">
        <h2>Fuentes</h2>
        <button className="add-source">+ Añadir fuente</button>
      </div>
      <div className="spacer"></div>
      <p className="info-text">
        Las fuentes guardadas aparecerán aquí. Puedes agregar PDFs, sitios web,
        textos o archivos de audio.
      </p>
    </div>
  );
};

export default Sidebar;
