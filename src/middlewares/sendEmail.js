import 'dotenv/config';
import 'express-async-errors';
import { generateToken } from '../utils/auth';
import ApplicationError from '../utils/Errors/applicationError';
import sendEmail from '../helper/sendEmail';
import userServices from '../services/user.service';


export const sendVerificationEmail = async (req, res, next) => {
  const { first_name, username, email } = req.body;
  const accessToken = generateToken({ username });

  const userInfoVerify = {
    email: email,
    subject: res.__('Verify your email'),
    html: res.__(`<p>Welcome to Barefoot Nomad, Click on the link below to verify your email.</p> <br> <a href='${process.env.FRONTEND_URL}/user/verification?token=${accessToken}'>Link</a>`)
  };

  const sendmail = await sendEmail(userInfoVerify);

  try {
    if(sendmail){
      return res.status(201).json({ Message: res.__(`User ${first_name} has been created. Check email for verification`) });
    }else{
      throw new ApplicationError(res.__("Failed to send the verification email, please try again!"), 500);
    }

  } catch (error) {
    next(error);
  }
};


export const sendResetPasswordEmail = async (req, res, next) => {

  try {
    const { email } = req.body;
    const userFound = await userServices.getUserByEmail(email);
    if (!userFound) return res.status(404).json({ status: 404, error: res.__('User not found') });
    if (!userFound.verified) return res.status(401).json({ status: 401, error: res.__('Account not verified') });
    const resetToken = generateToken({ username: userFound.username });

    const userInfoReset = {
      email: email,
      subject: res.__('Reset your password'),
      html: res.__(`<p>Hello, you requested to reset your password on Barefoot Nomad, Click on the link below to enter new password.</p> <br> <a href='${process.env.FRONTEND_URL}/user/reset-password?token=${resetToken}'><b>Reset password Link</b></a>`)
    };

    const sendmail = await sendEmail(userInfoReset);

    if(sendmail){
      return res.status(200).json({ status: 200, message: res.__('Request sent successfully, please check your email to reset your password') });

    }else{
      throw new ApplicationError(res.__("Failed to send the reset email, please try again!"), 500);
    }

  } catch (error) {
    next(error);
  }
};
