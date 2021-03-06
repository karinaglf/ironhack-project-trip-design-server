const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const citySchema = new Schema({
  name: { type: String },
  description: { type: String },
  country: { type: Schema.Types.ObjectId, ref: 'Country' },
  img: { type: String, default: 'https://images.unsplash.com/photo-1520645521318-f03a712f0e67'},
  accommodations: [{ type: Schema.Types.ObjectId, ref: 'Accommodation' }],
  experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
});

module.exports = model('City', citySchema);