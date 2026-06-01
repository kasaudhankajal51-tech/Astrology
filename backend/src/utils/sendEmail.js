import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this based on your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendCredentialsEmail = async (studentEmail, password, studentName, courseTitle) => {
  const mailOptions = {
    from: `"Cosmic Light Academy" <${process.env.EMAIL_USER}>`,
    to: studentEmail,
    subject: `Welcome to Cosmic Light Academy - Your Login Credentials`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #C8832A; border-radius: 10px;">
        <h2 style="color: #2A0F02; text-align: center;">Welcome to Cosmic Light Academy!</h2>
        <p>Dear ${studentName},</p>
        <p>Thank you for enrolling in <strong>${courseTitle}</strong>. Your payment was successful and your learning journey is ready to begin!</p>
        <p>Here are your secure login credentials to access the Student Portal:</p>
        <div style="background-color: #FDF6EE; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Email:</strong> ${studentEmail}</p>
          <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
        </div>
        <p>You can log in and access your course materials here: <a href="https://dsastroinstitute.com/login" style="color: #C8832A; font-weight: bold;">Student Login</a></p>
        <p>Please change your password after your first login.</p>
        <br/>
        <p style="color: #666; font-size: 12px; text-align: center;">
          May the stars guide you.<br/>
          <strong>Cosmic Light Astrology Team</strong>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${studentEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const sendAdminNotificationEmail = async (subject, htmlContent) => {
  if (!process.env.ADMIN_EMAIL) {
    console.log('ADMIN_EMAIL not configured, skipping admin notification.');
    return;
  }
  
  const mailOptions = {
    from: `"DS Astro System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Admin notification sent to ${process.env.ADMIN_EMAIL}`);
  } catch (error) {
    console.error('Error sending admin email:', error);
  }
};

export const sendPasswordResetEmail = async (studentEmail, studentName, otp) => {
  const mailOptions = {
    from: `"Cosmic Light Academy" <${process.env.EMAIL_USER}>`,
    to: studentEmail,
    subject: `Password Reset Request - Cosmic Light Academy`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #C8832A; border-radius: 10px;">
        <h2 style="color: #2A0F02; text-align: center;">Password Reset Request</h2>
        <p>Dear ${studentName},</p>
        <p>We received a request to reset the password for your Cosmic Light Academy student account.</p>
        <p>Your 6-digit OTP code is:</p>
        <div style="background-color: #FDF6EE; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <h1 style="margin: 0; color: #C8832A; letter-spacing: 5px;">${otp}</h1>
        </div>
        <p>This code is valid for 15 minutes. If you did not request this password reset, please ignore this email.</p>
        <br/>
        <p style="color: #666; font-size: 12px; text-align: center;">
          May the stars guide you.<br/>
          <strong>Cosmic Light Astrology Team</strong>
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset OTP sent to ${studentEmail}`);
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
};
