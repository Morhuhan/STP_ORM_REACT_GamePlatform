import React from 'react';

const GameGridItem = ({ name, genre, releaseDate, cover, score, onEdit, onDelete }) => {
  return (

    <div className='game-grid-item'>

      <div className='platform-grid-item-buttons-container'> 
        <button onClick={onEdit}>Изменить</button> 
        <button onClick={onDelete}>Удалить</button> 
      </div>

      <div className='platform-grid-item-main-container'>

        <div className='game-grid-item-img-container'>
            <img src={cover} alt={name} />
        </div>

        <div className='game-grid-item-name-char-container'>
          <h3>{name}</h3>
          <p>{genre}</p>
          <p>{releaseDate}</p>
          <p>{score}</p>
        </div>
      </div>
    </div>
  );
};

export default GameGridItem;
