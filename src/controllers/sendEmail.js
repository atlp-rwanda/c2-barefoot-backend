import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: 'renedeolynda@gmail.com',
    pass: 'rene.deo.lynda.'
  }
});

export const sendVerificationEmail = async (data) => {
  const mailOptions = {
    from: '"Barefoot Nomad"<renedeolynda@gmail.com>',
    to: data,
    subject: 'Verify your email.',
    html: '<p>Welcome to Barefoot Nomad, verify your email to continue</p>'
  };
  const sendmail = await transporter.sendMail(mailOptions);
  return sendmail;
};
