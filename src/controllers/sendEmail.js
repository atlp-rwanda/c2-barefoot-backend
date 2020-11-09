import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const sender = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendResetPasswordLink = async (data) => {
  const accessToken = jwt.sign({ user: data }, process.env.TOKEN_SECRET);
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: data,
    subject: 'Reset password',
    html: `<p>Welcome to barefoot nomad, click on this <a href=http://localhost:3000/resetPassword/verify?token=${accessToken}>link</a> to reset your password</p>`,
  };
  const sendEmail = await sender.sendMail(mailOptions);
  console.log(sendEmail);

  return sendEmail;
};

export default sendResetPasswordLink;
