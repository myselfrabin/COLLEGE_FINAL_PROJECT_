import nodemailer from 'nodemailer';

// Configure your email transporter (use environment variables in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your app password
  },
});

export async function sendTripConfirmationEmail(email) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Trip Request Received',
    text: `Thank you for submitting your trip request. Please wait a few hours to receive a response from our team. This is an automated email please do not reply. You will receive a detailed email shortly.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
} 