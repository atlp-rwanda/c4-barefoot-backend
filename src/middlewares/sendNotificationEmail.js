import nodemailer from 'nodemailer';
import models from '../models';
import 'dotenv/config';
import 'express-async-errors';
import { generateToken } from '../utils/auth';
import isUserExist from '../services/findUserById';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
});

const assignUserTomanagerEmail = async (email) => {
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: 'Verify your email',
    html: '<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You was assigned to a manager.</p> <br>'
  };

  try {
    const sendmail = await transporter.sendMail(mailOptions);
    console.log(sendmail);
    console.log(mailOptions.html);
  } catch (error) {
    console.log(error.message);
  }
};

export const approveTravelRequestEmail = async (email, action) => {
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: 'Rejected travel request',
    html: `<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> Your travel request was ${action}d.</p> <br>`
  };

  try {
    const sendmail = await transporter.sendMail(mailOptions);
    console.log(sendmail);
    console.log(mailOptions.html);
  } catch (error) {
    console.log(error.message);
  }
};

export const cancelTravelRequestEmail = async (email, action) => {
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: 'Rejected travel request',
    html: `<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You ${action}ed your travel request
    .</p> <br>`
  };

  try {
    const sendmail = await transporter.sendMail(mailOptions);
    console.log(sendmail);
    console.log(mailOptions.html);
  } catch (error) {
    console.log(error.message);
  }
};
export default assignUserTomanagerEmail;
