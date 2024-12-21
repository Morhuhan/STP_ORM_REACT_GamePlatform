import React, { useState } from 'react';
import Overlay from './Overlay';

const ModalGamePlatformEdit = ({ gamePlatform, onClose, onEdit }) => {
  const [name, setName] = useState(gamePlatform.name);
  const [description, setDescription] = useState(gamePlatform.description);
  const [urlImage, setUrlImage] = useState(gamePlatform.urlImage || ''); 
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !description) {
      setError('Все поля обязательны для заполнения.');
      return;
    }

    if (name.length > 255 || description.length > 255) {
      setError('Длина каждого поля не должна превышать 255 символов.');
      return;
    }

    const updatedGamePlatform = { name, description, urlImage }; 
    fetch(`http://localhost:8080/api/gamePlatforms/${gamePlatform.id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGamePlatform),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при изменении игровой платформы');
        }
        return response.json();
      })
      .then(data => {
        onEdit(data); 
        onClose(); 
      })
      .catch(error => {
        setError('Не удалось изменить игровую платформу.');
        console.error('Ошибка:', error);
      });
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <div className="modal">
        <div className="modal-content">
          <h2>Изменить игровую платформу</h2>
          {error && <div className="error">{error}</div>}
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength="255"
            />
          </div>
          <div className="form-group">
            <label>Описание</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength="255"
            />
          </div>
          <div className="form-group">
            <label>URL картинки</label> 
            <input
              type="text"
              value={urlImage}
              onChange={(e) => setUrlImage(e.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button onClick={handleSubmit}>Готово</button>
            <button onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalGamePlatformEdit;
