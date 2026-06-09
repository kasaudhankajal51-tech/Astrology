import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const getEmailFrom = () =>
  process.env.EMAIL_FROM || `"DS Institute" <${process.env.EMAIL_USER}>`;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendCredentialsEmail = async (studentEmail, password, studentName, courseTitle) => {
  const mailOptions = {
    from: getEmailFrom(),
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

export const sendPaidLeadAdminEmail = async ({
  customerName,
  phone,
  email,
  product,
  amount,
  paymentId,
  orderId,
}) => {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  await sendAdminNotificationEmail(
    `Paid booking: ${product}`,
    `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px; background: #f9f9f9;">
      <h2 style="color: #6b4a44; margin-top: 0;">Payment received</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Customer:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${customerName}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Product/Service:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${product}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Amount:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">₹${amount ?? 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Payment ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${paymentId || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #ddd;"><strong>Order ID:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #ddd;">${orderId || 'N/A'}</td></tr>
        <tr><td style="padding: 8px 0;"><strong>Timestamp:</strong></td><td style="padding: 8px 0;">${timestamp}</td></tr>
      </table>
    </div>
    `
  );
};

export const sendAdminNotificationEmail = async (subject, htmlContent) => {
  if (!process.env.ADMIN_EMAIL) {
    console.log('ADMIN_EMAIL not configured, skipping admin notification.');
    return;
  }
  
  const mailOptions = {
    from: getEmailFrom(),
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
    from: getEmailFrom(),
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
