import nodemailer from 'nodemailer';
import 'dotenv/config';
import {google} from 'googleapis';
import sgMail from '@sendgrid/mail'
import emailTemplate from './emailTemplate';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (userInfo) =>{
 
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: userInfo.email,
    subject: userInfo.subject,
    html: emailTemplate(userInfo)
  };
  try {
    const sendmail = sgMail.send(mailOptions);
    return sendmail;
  }
  catch(err){
     return err;;
  }
}
export default sendEmail;// 