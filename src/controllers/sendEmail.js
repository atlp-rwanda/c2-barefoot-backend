import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
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

const sendVerificationEmail = async (data) => {
  const accessToken = jwt.sign({ user: data }, process.env.TOKEN_SECRET);
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: data,
    subject: 'Verify your email',
    html: `<p>Welcome to Barefoot Nomad, Click on the link below to verify your email.</p> <br> <a href='http://localhost:3000/verification/${accessToken}'>Link</a>`
  };
  const sendmail = await transporter.sendMail(mailOptions);
  return sendmail;
};

export default sendVerificationEmail;
