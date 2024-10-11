import React, { useState, useEffect } from 'react';
import PlatformGridItem from './PlatformGridItem';
import GridHeader from './GridHeader';
import ModalPlatformCreate from './ModalPlatformCreate';
import ModalPlatformEdit from './ModalPlatformEdit';

const PlatformGrid = ({ platforms, onPlatformSelect, setPlatforms }) => { 
  const [filteredPlatforms, setFilteredPlatforms] = useState(platforms);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); 
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedPlatformForEdit, setSelectedPlatformForEdit] = useState(null); 
  const [selectedPlatformId, setSelectedPlatformId] = useState(null); // Добавляем состояние для выбранной платформы

  useEffect(() => {
    setFilteredPlatforms(platforms); 
  }, [platforms]);

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleEdit = (platform) => {
    setSelectedPlatformForEdit(platform);
    setIsEditModalOpen(true); 
  };

  const handleDelete = (platformId) => {
    fetch(`http://localhost:8080/api/platforms/${platformId}/delete`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          setFilteredPlatforms((prevPlatforms) =>
            prevPlatforms.filter((platform) => platform.id !== platformId)
          );
        } else {
          return response.text().then((message) => {
            alert(`Ошибка при удалении платформы: ${message}`);
          });
        }
      })
      .catch((error) => {
        alert(`Ошибка при удалении платформы: ${error.message}`);
      });
  };
  
  const handleFilter = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredPlatforms(platforms); 
    } else {
      const filtered = platforms.filter(platform =>
        platform.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPlatforms(filtered);
    }
  };

  const handleSelectPlatform = (platformId) => {
    setSelectedPlatformId(platformId); // Обновляем выбранную платформу
    onPlatformSelect(platformId);
  };

  const handlePlatformCreate = (newPlatform) => {
    setPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform]); 
    setFilteredPlatforms((prevFilteredPlatforms) => [...prevFilteredPlatforms, newPlatform]); 
  };

  const handlePlatformEdit = (updatedPlatform) => {
    const updatedPlatforms = platforms.map(platform => 
      platform.id === updatedPlatform.id ? updatedPlatform : platform
    );
    setFilteredPlatforms(updatedPlatforms);
  };

  return (
    <div className="PlatformGrid">

      <GridHeader 
        gridName="Площадки" 
        grid={platforms} 
        onCreate={handleCreate}  
        onFilter={handleFilter} 
      />

      <div className='grid-item-container'>
        {filteredPlatforms.map((platform) => (
          <PlatformGridItem
            key={platform.id}
            platform={platform}
            isSelected={platform.id === selectedPlatformId} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onSelect={handleSelectPlatform}
          />
        ))}
      </div>

      {isCreateModalOpen && (
        <ModalPlatformCreate 
          onClose={() => setIsCreateModalOpen(false)}  
          onCreate={handlePlatformCreate}  
        />
      )}

      {isEditModalOpen && selectedPlatformForEdit && (
        <ModalPlatformEdit 
          platform={selectedPlatformForEdit}  
          onClose={() => setIsEditModalOpen(false)}  
          onEdit={handlePlatformEdit} 
        />
      )}

    </div>
  );
};

export default PlatformGrid;
