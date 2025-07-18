import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '',
    scale: '',
    color: '#000000',
    manufacturer: '',
    history: '',
    funFacts: '',
    description: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    for (let img of images) data.append('images', img);

    await axios.post('/api/cars', data);
    alert('Car added!');
    setForm({
      make: '',
      model: '',
      year: '',
      scale: '',
      color: '#000000',
      manufacturer: '',
      history: '',
      funFacts: '',
      description: '',
    });
    setImages([]);
  };

  return (
    <form className="add-car-form" onSubmit={handleSubmit}>
      <h2>Add New Car</h2>
      {['make', 'model', 'year', 'scale', 'manufacturer'].map(key => (
        <input
          key={key}
          name={key}
          value={form[key]}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          onChange={handleChange}
          required
        />
      ))}
      <label>
        Color: <input type="color" name="color" value={form.color} onChange={handleChange} />
      </label>
      <textarea name="description" value={form.description} placeholder="Description" onChange={handleChange} />
      <textarea name="history" value={form.history} placeholder="Real Car History" onChange={handleChange} />
      <textarea name="funFacts" value={form.funFacts} placeholder="Fun Facts" onChange={handleChange} />
      <input type="file" multiple accept="image/*" onChange={e => setImages([...e.target.files])} />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;
