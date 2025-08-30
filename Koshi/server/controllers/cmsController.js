import { Place, Event, Update, Review } from '../models/CmsModels.js';

// Generic helpers
const ok = (res, data) => res.status(200).json(data);
const created = (res, data) => res.status(201).json(data);
const fail = (res) => (e) => res.status(500).json({ message: 'Server error' });

// Places
export const listPlaces = async (req, res) => {
  try { const items = await Place.find().sort({ createdAt: -1 }); return ok(res, items); } catch (e) { return fail(res)(e); }
};
export const createPlace = async (req, res) => {
  try { const doc = await Place.create(req.body); return created(res, doc); } catch (e) { return fail(res)(e); }
};
export const updatePlace = async (req, res) => {
  try { const doc = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true }); return ok(res, doc); } catch (e) { return fail(res)(e); }
};
export const deletePlace = async (req, res) => {
  try { await Place.findByIdAndDelete(req.params.id); return ok(res, { message: 'Deleted' }); } catch (e) { return fail(res)(e); }
};

// Events
export const listEvents = async (req, res) => { try { const items = await Event.find().sort({ createdAt: -1 }); return ok(res, items); } catch (e) { return fail(res)(e); } };
export const createEvent = async (req, res) => { try { const doc = await Event.create(req.body); return created(res, doc); } catch (e) { return fail(res)(e); } };
export const updateEvent = async (req, res) => { try { const doc = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true }); return ok(res, doc); } catch (e) { return fail(res)(e); } };
export const deleteEvent = async (req, res) => { try { await Event.findByIdAndDelete(req.params.id); return ok(res, { message: 'Deleted' }); } catch (e) { return fail(res)(e); } };

// Updates
export const listUpdates = async (req, res) => { try { const items = await Update.find().sort({ createdAt: -1 }); return ok(res, items); } catch (e) { return fail(res)(e); } };
export const createUpdate = async (req, res) => { try { const doc = await Update.create(req.body); return created(res, doc); } catch (e) { return fail(res)(e); } };
export const updateUpdate = async (req, res) => { try { const doc = await Update.findByIdAndUpdate(req.params.id, req.body, { new: true }); return ok(res, doc); } catch (e) { return fail(res)(e); } };
export const deleteUpdate = async (req, res) => { try { await Update.findByIdAndDelete(req.params.id); return ok(res, { message: 'Deleted' }); } catch (e) { return fail(res)(e); } };

// Reviews
export const listReviews = async (req, res) => { try { const items = await Review.find().sort({ createdAt: -1 }); return ok(res, items); } catch (e) { return fail(res)(e); } };
export const createReview = async (req, res) => { try { const doc = await Review.create(req.body); return created(res, doc); } catch (e) { return fail(res)(e); } };
export const updateReview = async (req, res) => { try { const doc = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true }); return ok(res, doc); } catch (e) { return fail(res)(e); } };
export const deleteReview = async (req, res) => { try { await Review.findByIdAndDelete(req.params.id); return ok(res, { message: 'Deleted' }); } catch (e) { return fail(res)(e); } };


