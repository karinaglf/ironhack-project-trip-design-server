const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const citySchema = new Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String, default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'},
  accommodations: [{ type: Schema.Types.ObjectId, ref: 'Accommodation' }],
});

module.exports = model('City', citySchema);