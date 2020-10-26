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

let link;
if (process.env.NODE_ENV === 'development') {
  link = 'http://localhost:3000/verification/';
} else {
  link = 'https://barefoot-nomad-production.herokuapp.com/verification/';
}
console.log(link);
const sendVerificationEmail = async (req, res) => {
  const { first_name, email } = req.body;
  const accessToken = jwt.sign({ user: email }, process.env.TOKEN_SECRET);
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Welcome to Barefoot Nomad, Click on the link below to verify your email.</p> <br> <a href='${link}${accessToken}'>Link</a>`
  };

  try {
    const sendmail = await transporter.sendMail(mailOptions);
    return res.status(200).json({ Message: `User ${first_name} has been created. Check email for verification` });
  } catch (error) {
    return res.status(400).json({ Error: 'Verification Email not sent, try again' });
  }
};

export default sendVerificationEmail;
