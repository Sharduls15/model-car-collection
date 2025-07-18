const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  scale: { type: String, required: true },
  color: { type: String, required: true }, // hex code (e.g. "#FF0000")
  manufacturer: { type: String, default: '' },
  history: { type: String, default: '' },
  funFacts: { type: String, default: '' },
  imageUrls: [{ type: String, required: true }],
  description: { type: String, default: '' }
});

module.exports = mongoose.model('Car', CarSchema);
