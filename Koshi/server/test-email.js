import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'rabingaire05@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from your Node.js server.',
}, (err, info) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Email sent:', info.response);
  }
});