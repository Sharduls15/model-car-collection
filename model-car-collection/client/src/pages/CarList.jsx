import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import FilterSidebar from '../components/FilterSidebar';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({
    colors: [],
    makes: [],
    manufacturers: [],
    years: [],
    scales: [],
  });

  useEffect(() => {
    const fetchCars = async () => {
      const res = await axios.get('/api/cars');
      const cars = res.data;
      setCars(cars);
      const extract = key => [...new Set(cars.map(car => car[key]))].filter(Boolean);
      setOptions({
        colors: extract('color'),
        makes: extract('make'),
        manufacturers: extract('manufacturer'),
        years: extract('year'),
        scales: extract('scale'),
      });
    };
    fetchCars();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, vals]) => {
      if (vals.length) params.set(key, vals.join(','));
    });
    axios.get(`/api/cars?${params}`).then(res => setCars(res.data));
  }, [filters]);

  return (
    <div className="car-list-page">
      <FilterSidebar filters={filters} setFilters={setFilters} options={options} />
      <div className="car-list">
        {cars.map(car => <CarCard key={car._id} car={car} />)}
      </div>
    </div>
  );
};

export default CarList;
