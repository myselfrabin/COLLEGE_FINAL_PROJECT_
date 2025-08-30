import { TripRequest } from '../models/TripRequest.js';
import { sendTripConfirmationEmail } from '../utils/sendTripConfirmationEmail.js';

export const tripRequestController = async (req, res) => {
  try {
    const tripData = req.body;
    const newTrip = new TripRequest(tripData);
    await newTrip.save();

    // Await and log the result of the email sending
    const emailResult = await sendTripConfirmationEmail(tripData.email);
    if (emailResult) {
      console.log('Confirmation email sent to', tripData.email);
    } else {
      console.error('Failed to send confirmation email to', tripData.email);
    }

    res.status(201).json({ message: 'Trip request submitted successfully!' });
  } catch (error) {
    console.error('Trip request error:', error);
    res.status(500).json({ message: 'Failed to submit trip request.' });
  }
};