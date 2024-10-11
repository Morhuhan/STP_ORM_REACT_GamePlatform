import React, { useState, useEffect } from 'react';
import GameGridItem from './GameGridItem';
import GridHeader from './GridHeader';
import ModalGameCreate from './ModalGameCreate';
import ModalGameEdit from './ModalGameEdit';

const GameGrid = ({ gamePlatformId, games, setGames }) => { 
  const [filteredGames, setFilteredGames] = useState(games);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedGameForEdit, setSelectedGameForEdit] = useState(null); 

  useEffect(() => {
    setFilteredGames(games); 
  }, [games]);

  const handleCreate = () => {
    setIsCreateModalOpen(true); 
  };

  const handleEdit = (game) => {
    setSelectedGameForEdit(game); 
    setIsEditModalOpen(true); 
  };

  const handleDelete = (gameId) => {
    fetch(`http://localhost:8080/api/games/${gameId}/delete`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          setGames((prevGames) =>
            prevGames.filter((game) => game.id !== gameId)
          );
          setFilteredGames((prevGames) =>
            prevGames.filter((game) => game.id !== gameId)
          );
        } else {
          return response.text().then((message) => {
            alert(`Ошибка при удалении игры: ${message}`);
          });
        }
      })
      .catch((error) => {
        alert(`Ошибка при удалении игры: ${error.message}`);
      });
  };

  const handleFilter = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

  const handleGameCreate = (newGame) => {
    setGames((prevGames) => [...prevGames, newGame]);  
    setFilteredGames((prevFilteredGames) => [...prevFilteredGames, newGame]); 
  };

  const handleGameEdit = (updatedGame) => {
    const updatedGames = games.map(game => 
      game.id === updatedGame.id ? updatedGame : game
    );
    setGames(updatedGames); 
    setFilteredGames(updatedGames);
  };

  return (
    <div className="GameGrid">
      <GridHeader 
        gridName="Игры" 
        grid={games} 
        onCreate={handleCreate} 
        onDelete={handleDelete} 
        onRemove={() => {}} 
        onFilter={handleFilter}
      />

      <div className='grid-item-container'>
        {filteredGames.map((game, index) => (
          <GameGridItem
            key={index}
            name={game.name}
            genre={game.genre}
            releaseDate={game.releaseDate}
            cover={game.cover}
            score={game.score}
            onEdit={() => handleEdit(game)}
            onDelete={() => handleDelete(game.id)}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <ModalGameCreate 
          gamePlatformId={gamePlatformId} 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={handleGameCreate} 
        />
      )}

      {isEditModalOpen && selectedGameForEdit && (
        <ModalGameEdit 
          game={selectedGameForEdit} 
          onClose={() => setIsEditModalOpen(false)} 
          onEdit={handleGameEdit} 
        />
      )}
    </div>
  );
};

export default GameGrid;
