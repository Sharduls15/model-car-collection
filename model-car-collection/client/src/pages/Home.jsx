import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwiperGallery from '../components/SwiperGallery';
import { Link } from 'react-router-dom';

const Home = () => {
  const [favoriteCars, setFavoriteCars] = useState([]);
  const [latestCar, setLatestCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get('/api/cars');
      const cars = res.data;
      setFavoriteCars(cars.slice(0, 5)); // First 5 as favorite
      setLatestCar(cars[cars.length - 1]); // Last one as recent
    };
    fetchCars();
  }, []);

  return (
    <div className="home">
      <section className="favorites-section">
        <h2>All-Time Favorites</h2>
        <div className="favorites-cards">
          {favoriteCars.map(car => (
            <div key={car._id} className="favorite-card">
              <SwiperGallery images={car.imageUrls} />
              <h4>{car.make} {car.model}</h4>
            </div>
          ))}
        </div>
      </section>

      <section className="latest-section">
        <h2>New Addition</h2>
        {latestCar && (
          <div className="latest-card">
            <SwiperGallery images={latestCar.imageUrls} />
            <h3>{latestCar.make} {latestCar.model}</h3>
            <Link to="/cars">View All</Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
