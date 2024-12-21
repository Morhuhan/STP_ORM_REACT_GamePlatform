import React from 'react';

const PlatformGridItem = ({ platform, onEdit, onDelete, onSelect, isSelected }) => {
  return (
    <div className={`platform-grid-item ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(platform.id)}> 
      <div className='platform-grid-item-buttons-container'>
        <button onClick={(e) => { e.stopPropagation(); onEdit(platform); }}>Изменить</button> 
        <button onClick={(e) => { e.stopPropagation(); onDelete(platform.id); }}>Удалить</button> 
      </div>

      <div className='platform-grid-item-main-container'>
        <div className='platform-grid-item-img-container'>
          <img src={platform.urlImage} alt={platform.name} />
        </div>

        <div className='platform-grid-item-name-char-container'>
          <h3>{platform.name}</h3>
          <p>{platform.characteristic}</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformGridItem;
