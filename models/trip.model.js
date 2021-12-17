const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tripSchema = new Schema({
  tripName: { type: String },
  coverImg: { type: String, default: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800'},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: Number },
  pax: { type: Number },
  coverMsg: { type: String },
  destination: [{
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    accommodations: [{ type: Schema.Types.ObjectId, ref: 'Accommodation' }],
  }],
  days: [
    {
      experiences: [{ type: Schema.Types.ObjectId, ref: 'Experience' }],
    }
  ],
  request: { type: Schema.Types.ObjectId, ref: 'Request' }
});

module.exports = model('Trip', tripSchema);