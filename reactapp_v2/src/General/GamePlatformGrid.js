import React, { useState, useEffect } from 'react';
import GamePlatformGridItem from './GamePlatformGridItem';
import GridHeader from './GridHeader';
import ModalGamePlatformCreate from './ModalGamePlatformCreate';
import ModalGamePlatformEdit from './ModalGamePlatformEdit';

const GamePlatformGrid = ({ platformId, gamePlatforms, setGamePlatforms, onGamePlatformSelect }) => {
  const [filteredGamePlatforms, setFilteredGamePlatforms] = useState(gamePlatforms);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGamePlatformForEdit, setSelectedGamePlatformForEdit] = useState(null);
  const [selectedGamePlatformId, setSelectedGamePlatformId] = useState(null);

  useEffect(() => {
    setFilteredGamePlatforms(gamePlatforms);
  }, [gamePlatforms]);

  useEffect(() => {
    if (filteredGamePlatforms.length > 0) {
      const firstGamePlatformId = filteredGamePlatforms[0].id;
      setSelectedGamePlatformId(firstGamePlatformId);
      onGamePlatformSelect(firstGamePlatformId);
    }
  }, [platformId, filteredGamePlatforms, onGamePlatformSelect]);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (gamePlatform) => {
    setSelectedGamePlatformForEdit(gamePlatform);
    setIsEditModalOpen(true);
  };

  const handleDelete = (gamePlatformId) => {
    fetch(`http://localhost:8080/api/gamePlatforms/${gamePlatformId}/delete`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          setGamePlatforms((prevGamePlatforms) =>
            prevGamePlatforms.filter((gamePlatform) => gamePlatform.id !== gamePlatformId)
          );
          setFilteredGamePlatforms((prevGamePlatforms) =>
            prevGamePlatforms.filter((gamePlatform) => gamePlatform.id !== gamePlatformId)
          );
        } else {
          return response.text().then((message) => {
            alert(`Ошибка при удалении игровой платформы: ${message}`);
          });
        }
      })
      .catch((error) => {
        alert(`Ошибка при удалении игровой платформы: ${error.message}`);
      });
  };

  const handleFilter = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredGamePlatforms(gamePlatforms);
    } else {
      const filtered = gamePlatforms.filter(platform =>
        platform.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGamePlatforms(filtered);
    }
  };

  const handleSelectGamePlatform = (gamePlatformId) => {
    setSelectedGamePlatformId(gamePlatformId);
    onGamePlatformSelect(gamePlatformId);
  };

  const handleGamePlatformCreate = (newGamePlatform) => {
    setGamePlatforms((prevGamePlatforms) => [...prevGamePlatforms, newGamePlatform]);
    setFilteredGamePlatforms((prevFilteredGamePlatforms) => [...prevFilteredGamePlatforms, newGamePlatform]);
  };

  const handleGamePlatformEdit = (updatedGamePlatform) => {
    const updatedGamePlatforms = gamePlatforms.map(gamePlatform =>
      gamePlatform.id === updatedGamePlatform.id ? updatedGamePlatform : gamePlatform
    );
    setGamePlatforms(updatedGamePlatforms);
    setFilteredGamePlatforms(updatedGamePlatforms);
  };

  return (
    <div className="GamePlatformGrid">
      <GridHeader
        gridName="Платформы"
        grid={gamePlatforms}
        onCreate={handleCreate}
        onDelete={() => {}}
        onFilter={handleFilter}
      />

      <div className='game-platform-grid-item-container'>
        {filteredGamePlatforms.map((gamePlatform) => (
          <GamePlatformGridItem
            key={gamePlatform.id}
            gamePlatform={gamePlatform}
            isSelected={gamePlatform.id === selectedGamePlatformId} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelect={() => handleSelectGamePlatform(gamePlatform.id)}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <ModalGamePlatformCreate
          platformId={platformId}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleGamePlatformCreate}
        />
      )}

      {isEditModalOpen && selectedGamePlatformForEdit && (
        <ModalGamePlatformEdit
          gamePlatform={selectedGamePlatformForEdit}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleGamePlatformEdit}
        />
      )}
    </div>
  );
};

export default GamePlatformGrid;
