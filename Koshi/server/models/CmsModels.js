import mongoose from 'mongoose';

const baseOpts = { timestamps: true };

const PlaceSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true },
  category: String,
  description: String,
  imageUrl: String,
  lat: Number,
  lng: Number,
  published: { type: Boolean, default: true },
}, baseOpts);

const EventSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  description: String,
  district: String,
  startDate: String,
  endDate: String,
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: true },
}, baseOpts);

const UpdateSchema = new mongoose.Schema({
  title: String,
  body: String,
  severity: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
  published: { type: Boolean, default: true },
}, baseOpts);

const ReviewSchema = new mongoose.Schema({
  placeSlug: String,
  name: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  approved: { type: Boolean, default: false },
}, baseOpts);

export const Place = mongoose.model('Place', PlaceSchema);
export const Event = mongoose.model('Event', EventSchema);
export const Update = mongoose.model('Update', UpdateSchema);
export const Review = mongoose.model('Review', ReviewSchema);


