import React from 'react';

const Overlay = ({ onClick, zIndex = 100 }) => { 
  return <div className="overlay" style={{ zIndex }} onClick={onClick}></div>;
};

export default Overlay;
