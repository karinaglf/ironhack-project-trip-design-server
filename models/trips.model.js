const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripsSchema = new Schema({
  tripName: { type: String },
  coverImg: { type: String, default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: Number },
  pax: { type: Number },
  coverMsg: { type: String },
});

module.exports = model('Trips', tripsSchema);

// const tripsSchema = new Schema({
//   tripName: { type: String },
//   coverImg: { type: String, default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'},
//   tripDetails: {
//     startDate: { type: String },
//     endDate: { type: String },
//     duration: { type: Number },
//     pax: { type: Number },
//   },
//   destination: {
//     country: { type: String },
//     cities: { type: Array },
//   }
// });