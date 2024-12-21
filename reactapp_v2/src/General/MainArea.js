import React, { useState, useEffect } from 'react';
import PlatformGrid from './PlatformGrid';
import GamePlatformGrid from './GamePlatformGrid';
import GameGrid from './GameGrid';

const MainArea = () => {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatformId, setSelectedPlatformId] = useState(null);
  const [gamePlatforms, setGamePlatforms] = useState([]);
  const [selectedGamePlatformId, setSelectedGamePlatformId] = useState(null);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/platforms')
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          setPlatforms(data);
          if (data.length > 0) {
            const firstPlatformId = data[0].id;
            setSelectedPlatformId(firstPlatformId);
          }
        } catch (error) {
          console.error('Ошибка при парсинге JSON:', error);
        }
      })
      .catch((error) => console.error('Ошибка при получении платформ:', error));
  }, []);

  useEffect(() => {
    if (selectedPlatformId) {
      fetch(`http://localhost:8080/api/platform/${selectedPlatformId}/gamePlatforms`)
        .then((response) => response.json())
        .then((data) => {
          setGamePlatforms(data);

          if (data.length > 0) {
            const firstGamePlatformId = data[0].id;
            setSelectedGamePlatformId(firstGamePlatformId);

            fetch(`http://localhost:8080/api/gamePlatform/${firstGamePlatformId}/games`)
              .then((response) => response.json())
              .then((gamesData) => {
                setGames(gamesData);
              })
              .catch((error) => console.error('Ошибка при получении игр:', error));
          } else {
            setSelectedGamePlatformId(null);
            setGames([]); 
          }
        })
        .catch((error) => console.error('Ошибка при получении игровых платформ:', error));
    }
  }, [selectedPlatformId]);

  useEffect(() => {
    if (selectedGamePlatformId) {
      fetch(`http://localhost:8080/api/gamePlatform/${selectedGamePlatformId}/games`)
        .then((response) => response.json())
        .then((data) => {
          setGames(data);
        })
        .catch((error) => console.error('Ошибка при получении игр:', error));
    }
  }, [selectedGamePlatformId]);

  const handlePlatformCreate = (newPlatform) => {
    setPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform]); 
  };

  return (
    <div className="MainArea">

      <PlatformGrid 
        platforms={platforms} 
        onPlatformSelect={setSelectedPlatformId} 
        onPlatformCreate={handlePlatformCreate} 
        setPlatforms={setPlatforms} 
      />

      <GamePlatformGrid 
        platformId={selectedPlatformId} 
        gamePlatforms={gamePlatforms} 
        onGamePlatformSelect={setSelectedGamePlatformId} 
        setGamePlatforms={setGamePlatforms} 
      />

      <GameGrid 
        gamePlatformId={selectedGamePlatformId} 
        games={games} 
        setGames={setGames}  
      />

    </div>
  );
};

export default MainArea;
