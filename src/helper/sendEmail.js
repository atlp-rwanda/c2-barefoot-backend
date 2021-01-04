import sgMail from '@sendgrid/mail';
import ApplicationError from '../utils/Errors/applicationError';
import 'dotenv/config';

const sendEmail = (userInfo) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const mailOptions = {
    from: `Barefoot Nomad<${process.env.GMAIL_EMAIL}>`,
    to: userInfo.email,
    subject: userInfo.subject,
    html: userInfo.html
  };

  return sgMail.send(mailOptions)
    .then(() => 'Email sent')
    .catch((error) => {
      throw new ApplicationError(error);
    });
};

export default sendEmail;
