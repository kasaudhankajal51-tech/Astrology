import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env.local')) {
  dotenv.config({ path: '.env.local' });
} else {
  dotenv.config();
}

console.log("Using EMAIL_USER:", process.env.EMAIL_USER);
console.log("Using EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 0);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'Test Email',
  text: 'This is a test email to verify credentials.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Test Email Failed:', error);
  } else {
    console.log('Test Email Sent:', info.response);
  }
});
