import React from 'react';

const ColorFilterBox = ({ color, selected, onClick }) => {
  return (
    <div
      className={`color-box-filter ${selected ? 'selected' : ''}`}
      style={{ backgroundColor: color }}
      onClick={() => onClick(color)}
      title={color}
    />
  );
};

export default ColorFilterBox;
