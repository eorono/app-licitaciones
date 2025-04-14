// src/components/NotebookFilters.jsx
import React from "react";

function NotebookFilters({ filterOption, setFilterOption }) {
  return (
    <div className="notebook-list-page__filters">
      <button
        className={`notebook-list-page__filter-btn ${
          filterOption === "recent" ? "active" : ""
        }`}
        onClick={() => setFilterOption("recent")}
      >
        Más recientes
      </button>
      <button
        className={`notebook-list-page__filter-btn ${
          filterOption === "title" ? "active" : ""
        }`}
        onClick={() => setFilterOption("title")}
      >
        Por título
      </button>
    </div>
  );
}

export default NotebookFilters;
