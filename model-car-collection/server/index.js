const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Car = require('./models/Car');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'model-cars',
    allowed_formats: ['jpg', 'png', 'jpeg']
  },
});
const upload = multer({ storage });

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/api/cars', async (req, res) => {
  try {
    const { make, color, year, scale, manufacturer } = req.query;
    const filter = {};
    if (make) filter.make = { $in: make.split(',') };
    if (color) filter.color = { $in: color.split(',') };
    if (year) filter.year = { $in: year.split(',').map(Number) };
    if (scale) filter.scale = { $in: scale.split(',') };
    if (manufacturer) filter.manufacturer = { $in: manufacturer.split(',') };

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/cars', upload.array('images', 10), async (req, res) => {
  try {
    const { make, model, year, scale, color, description, manufacturer, history, funFacts } = req.body;
    const imageUrls = req.files.map(file => file.path);
    const newCar = new Car({
      make,
      model,
      year,
      scale,
      color,
      description,
      manufacturer,
      history,
      funFacts,
      imageUrls
    });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
