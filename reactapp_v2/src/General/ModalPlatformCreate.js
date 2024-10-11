import React, { useState } from 'react';
import Overlay from './Overlay';

const ModalPlatformCreate = ({ onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [characteristic, setCharacteristic] = useState('');
  const [img, setImg] = useState('');
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

    const newPlatform = { name, characteristic, urlImage: img };
    fetch('http://localhost:8080/api/platforms/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlatform),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при создании платформы');
        }
        return response.json();
      })
      .then(data => {
        onCreate(data);
        onClose();
      })
      .catch(error => {
        setError('Не удалось создать платформу.');
        console.error('Ошибка:', error);
      });
  };

  return (
    <>
      <Overlay onClick={onClose} zIndex={100} /> 
      <div className="modal" style={{ zIndex: 101 }}>
        <div className="modal-content">
          <h2>Создать платформу</h2>
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

export default ModalPlatformCreate;
