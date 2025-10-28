import React, { useState } from "react";

const SearchFeature = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  return (
    <div className="d-flex justify-content-center h-100 mt-2">
      <div className="search">
        <input
          className="search_input"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by phone, name or temple name..."
        />
        <button type="button" className="search_icon">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

export default SearchFeature;
