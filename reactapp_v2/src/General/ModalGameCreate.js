import React, { useState } from 'react';
import Overlay from './Overlay'; 

const ModalGameCreate = ({ gamePlatformId, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [cover, setCover] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !genre || !releaseDate || !cover || !score) {
      setError('Все поля обязательны для заполнения.');
      return;
    }

    if (name.length > 20 || genre.length > 20 || releaseDate.length > 20 || cover.length > 255 || String(score).length > 20) {
      setError('Ошибка: Поля Название, Жанр, Дата выпуска и Оценка - 20 символов; URL - 255 символов.');
      return;
    }

    const newGame = { name, genre, releaseDate, cover, score };

    fetch(`http://localhost:8080/api/gamePlatform/${gamePlatformId}/games/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGame),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Не удалось создать игру.');
        }
        return response.json();
      })
      .then(data => {
        onCreate(data);
        onClose(); 
      })
      .catch(error => {
        setError('Не удалось создать игру.');
        console.error('Ошибка:', error);
      });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          <h2>Создать игру</h2>
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Жанр</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Дата выпуска</label>
            <input
              type="text"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Оценка</label>
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button onClick={handleSubmit}>Создать</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalGameCreate;
