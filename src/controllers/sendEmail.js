import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

export const sendVerificationEmail = async (data) => {
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: data,
    subject: 'Verify your email.',
    html: '<p>Welcome to Barefoot Nomad, verify your email to continue</p>'
  };
  const sendmail = await transporter.sendMail(mailOptions);
  return sendmail;
};
