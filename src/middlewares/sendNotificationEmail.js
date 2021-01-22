import nodemailer from 'nodemailer';
import models from '../models';
import 'dotenv/config';
import 'express-async-errors';
import { generateToken } from '../utils/auth';
import isUserExist from '../services/findUserById';
import sendEmail from '../helper/sendEmail';


const assignUserTomanagerEmail = async (email) => {
  const mailOptions = {
    email: email,
    subject: 'Verify your email',
    html: '<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You was assigned to a manager.</p> <br>'
  };
  const sendmail = await sendEmail(mailOptions);
  try {
    
    if(sendmail){
      return res.status(201).json({ Message: `user was assigned to manager with this Id ${manager_id}` });
    }else{
      throw new ApplicationError((`User with this ${userId} is not exist`), 500);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const approveTravelRequestEmail = async (email, action) => {
  const mailOptions = {
    email: email,
    subject: 'Your travel request',
    html: `<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> Your travel request was ${action}d.</p> <br>`
  };
  const sendmail = await sendEmail(mailOptions);
  try {
    
    if(sendmail){
      return res.status(201).json({ Message: "Operation performed successfully!" });
    }else{
      throw new ApplicationError((`The travel request is already ${findTravelRequest.status}`), 500);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const cancelTravelRequestEmail = async (email, action) => {
  const mailOptions = {
    email: email,
    subject: 'Your travel request',
    html: `<p><strong>Barefoot Nomad</strong><br><br> Hi, <br> You ${action}ed your travel request
    .</p> <br>`
  };
  const sendmail = await sendEmail(mailOptions);
  try {
    
    if(sendmail){
      return res.status(201).json({ Message: "Travel request canceled successfully!" });
    }else{
      throw new ApplicationError((`Can not cancel this travel request, because it is ${findTravelRequest.status}`), 500);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export default assignUserTomanagerEmail;
