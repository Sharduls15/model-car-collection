import React from 'react';
import SwiperGallery from './SwiperGallery';

const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <SwiperGallery images={car.imageUrls} />
      <div className="car-info">
        <h3>{car.make} {car.model}</h3>
        <p><strong>Year:</strong> {car.year}</p>
        <p><strong>Scale:</strong> {car.scale}</p>
        <p><strong>Manufacturer:</strong> {car.manufacturer}</p>
        <p><strong>History:</strong> {car.history}</p>
        <p><strong>Fun Facts:</strong> {car.funFacts}</p>
        <p><strong>Description:</strong> {car.description}</p>
        <p><strong>Color:</strong> <span className="color-box" style={{ backgroundColor: car.color }}></span> {car.color}</p>
      </div>
    </div>
  );
};

export default CarCard;
