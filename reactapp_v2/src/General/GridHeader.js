import React, { useState } from 'react';

const GridHeader = ({ gridName, onCreate, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onFilter(value); 
  };

  return (
    <div className='GridHeader'>
      <div className='gridName'>
        <h2>{gridName}</h2>
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="action-buttons-container">
        <button onClick={onCreate}>Создать</button>
      </div>
    </div>
  );
};

export default GridHeader;
