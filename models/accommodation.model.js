const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const accommodationSchema = new Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String, default: 'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a'},
  category: { type: String },
  externalUrl: { type: String },
  affiliateUrl: { type: String }
});

module.exports = model('Accommodation', accommodationSchema );