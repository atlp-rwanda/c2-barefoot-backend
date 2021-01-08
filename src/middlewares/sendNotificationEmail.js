import 'dotenv/config';
import 'express-async-errors';
import sendMail from '../helper/sendEmail';

const assignUserTomanagerEmail = async (email) => {
  const mailOptions = {
    email,
    subject: 'Verify your email',
    html: '<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You was assigned to a manager.</p> <br>'
  };

  try {
    const sendmail = await sendMail(mailOptions);
  } catch (error) {
  }
};

export const approveTravelRequestEmail = async (email, action) => {
  const mailOptions = {
    email,
    subject: 'Rejected travel request',
    html: `<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> Your travel request was ${action}d.</p> <br>`
  };

  try {
    const sendmail = await sendMail(mailOptions);
  } catch (error) {
  }
};

export const cancelTravelRequestEmail = async (email, action) => {
  const mailOptions = {
    email,
    subject: 'Rejected travel request',
    html: `<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You ${action}ed your travel request
    .</p> <br>`
  };

  try {
    const sendmail = await sendMail(mailOptions);
  } catch (error) {
  }
};
export default assignUserTomanagerEmail;
