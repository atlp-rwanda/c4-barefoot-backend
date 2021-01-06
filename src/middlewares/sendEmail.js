import nodemailer from 'nodemailer';
import 'dotenv/config';
import 'express-async-errors';
import { generateToken } from '../utils/auth';


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_EMAIL,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: process.env.ACCESS_TOKEN,
    expires: 3599
  }
});

const sendVerificationEmail = async (req, res, next) => {
  const { first_name, username, email } = req.body;
  const accessToken = generateToken({ username });
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: email,
    subject: 'Verify your email',
    html: `<p>Welcome to Barefoot Nomad, Click on the link below to verify your email.</p> <br> <a href='${process.env.FRONTEND_URL}/user/verification?token=${accessToken}'>Link</a>`
  };

  try {
    const sendmail = await transporter.sendMail(mailOptions);
    return res.status(201).json({ Message: `User ${first_name} has been created. Check email for verification` });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default sendVerificationEmail;
