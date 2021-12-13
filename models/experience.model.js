const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const experienceSchema = new Schema({
  name: { type: String },
  description: { type: String },
  img: { type: String, default: 'https://images.unsplash.com/photo-1525875098832-46c7d9d0794e'},
  category: { type: String },
  externalUrl: { type: String },
  affiliateUrl: { type: String }
});

module.exports = model('Experience', experienceSchema );