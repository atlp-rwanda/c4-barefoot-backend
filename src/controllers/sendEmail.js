import nodemailer from 'nodemailer';
import 'dotenv/config';
import 'express-async-errors';
import { generateToken } from '../utils/auth';

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
  link = process.env.LOCAL_LINK;
} else {
  link = process.env.PRODUCTION_LINK;
}
const sendVerificationEmail = async (req, res, next) => {
  const { first_name, username } = req.body;
  const accessToken = generateToken({ username });
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Welcome to Barefoot Nomad, Click on the link below to verify your email.</p> <br> <a href='${link}${accessToken}'>Link</a>`
  };

  try {
    const sendmail = await transporter.sendMail(mailOptions);
    return res.status(201).json({ message: `User ${first_name} has been created. Check email for verification` });
  } catch (error) {
    next(error);
  }
};

export default sendVerificationEmail;
