const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const requestSchema = new Schema({
  destination: [{ type: Schema.Types.ObjectId, ref: 'City' }],
  requestedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  tripPlan: { type: Schema.Types.ObjectId, ref: 'Trip' },
  startDate: { type: String },
  endDate: { type: String },
  duration: { type: Number },
  pax: { type: Number },
  budgetPerPerson: { type: Number },
  typeOfAccommodation: { type: Array },
  detailsOccasion: { type: String },
  activitiesToInclude: { type: Array },
  specialRequest: { type: String },
  status: { type: String, default: 'pending'},
},
{
    timestamps: true
});

module.exports = model('Request', requestSchema);