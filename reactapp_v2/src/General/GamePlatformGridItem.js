import React from 'react';

const GamePlatformGridItem = ({ gamePlatform, onEdit, onDelete, onSelect, isSelected }) => {
  return (
    <div className={`game-platform-grid-item ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(gamePlatform.id)}>
      <div 
        className="platform-grid-item-buttons-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="game-platform-grid-item-button" 
          onClick={() => onEdit(gamePlatform)}
        >
          Изменить
        </button>
        <button 
          className="game-platform-grid-item-button" 
          onClick={() => onDelete(gamePlatform.id)}
        >
          Удалить
        </button>
      </div>

      <div className="platform-grid-item-main-container">
        <img 
          className="game-platform-grid-item-image" 
          src={gamePlatform.urlImage} 
          alt={gamePlatform.name} 
        />
        <h3 className="game-platform-grid-item-title">{gamePlatform.name}</h3>
      </div>
    </div>
  );
};

export default GamePlatformGridItem;
