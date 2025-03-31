import "../styles/Notes.css";

const Notes = ({ isExpanded, toggleExpand }) => {
  return (
    <div className={`notes ${isExpanded ? "expanded" : "collapsed"}`}>
      <button className="toggle-button" onClick={toggleExpand}>
        {isExpanded ? "⬅" : "➡"}
      </button>
      {isExpanded && (
        <>
          <h2>Studio</h2>
          <button className="add-note">+ Añadir nota</button>
        </>
      )}
    </div>
  );
};

export default Notes;
