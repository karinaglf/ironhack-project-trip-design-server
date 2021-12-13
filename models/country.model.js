const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const countrySchema = new Schema({
  name: { type: String },
  code: { type: String }
});

module.exports = model('Country', countrySchema);