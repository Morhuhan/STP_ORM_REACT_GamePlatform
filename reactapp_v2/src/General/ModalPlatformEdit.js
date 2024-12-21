import React, { useState } from 'react';
import Overlay from './Overlay';

const ModalPlatformEdit = ({ platform, onClose, onEdit }) => {
  const [name, setName] = useState(platform.name);
  const [characteristic, setCharacteristic] = useState(platform.characteristic);
  const [img, setImg] = useState(platform.urlImage);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !characteristic || !img) {
      setError('Все поля обязательны для заполнения.');
      return;
    }

    if (name.length > 20 || characteristic.length > 90 || img.length > 255) {
      setError('Ошибка: Название - 20 символов, Характеристика - 90 символов, URL - 255 символов');
      return;
    }

    const updatedPlatform = { name, characteristic, urlImage: img };
    fetch(`http://localhost:8080/api/platforms/${platform.id}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlatform),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при изменении платформы');
        }
        return response.json();
      })
      .then(data => {
        onEdit(data);
        onClose();
      })
      .catch(error => {
        setError('Не удалось изменить платформу.');
        console.error('Ошибка:', error);
      });
  };

  return (
    <>
      <Overlay onClick={onClose} zIndex={100} /> 
      <div className="modal" style={{ zIndex: 101 }}>
        <div className="modal-content">
          <h2>Изменить платформу</h2>
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
            <label>Характеристика</label>
            <input
              type="text"
              value={characteristic}
              onChange={(e) => setCharacteristic(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>URL-изображения</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
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

export default ModalPlatformEdit;
