import React, { useState } from 'react';
import Overlay from './Overlay'; 

const ModalGameEdit = ({ game, onClose, onEdit }) => {
  const [name, setName] = useState(game.name);
  const [genre, setGenre] = useState(game.genre);
  const [releaseDate, setReleaseDate] = useState(game.releaseDate);
  const [cover, setCover] = useState(game.cover);
  const [score, setScore] = useState(game.score);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !genre || !releaseDate || !cover || !score) {
      setError('Все поля обязательны для заполнения.');
      return;
    }

    if (name.length > 20 || genre.length > 20 || releaseDate.length > 20 || cover.length > 255 || String(score).length > 20) {
      setError('Ошибка: Поля name, genre, releaseDate и score - 20 символов; cover - 255 символов.');
      return;
    }

    const updatedGame = { name, genre, releaseDate, cover, score };

    fetch(`http://localhost:8080/api/games/${game.id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGame),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Не удалось изменить игру.');
        }
        return response.json();
      })
      .then(data => {
        onEdit(data);
        onClose();
      })
      .catch(error => {
        setError('Не удалось обновить игру.');
        console.error('Ошибка:', error);
      });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          <h2>Редактировать игру</h2>
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
            <label>Обложка</label>
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
            <button onClick={handleSubmit}>Сохранить</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalGameEdit;
