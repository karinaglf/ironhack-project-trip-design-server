const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripsSchema = new Schema({
  tripName: { type: String },
  coverImg: { type: String, default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'},
  tripDetails: {
    startDate: { type: String },
    endDate: { type: String },
    duration: { type: Number },
    pax: { type: Number },
  }
});

module.exports = model('Trips', tripsSchema);
