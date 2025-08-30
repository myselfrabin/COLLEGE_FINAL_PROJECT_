import mongoose from 'mongoose';

const TripRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  destination: { type: String },
  duration: { type: String },
  groupSize: { type: String },
  activities: { type: String },
  budget: { type: String },
  travelDate: { type: String },
  specialRequests: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export const TripRequest = mongoose.model('TripRequest', TripRequestSchema); 