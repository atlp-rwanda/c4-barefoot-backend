import nodemailer from 'nodemailer';
import 'dotenv/config';
import {google} from 'googleapis';
import sgMail from '@sendgrid/mail'
import emailTemplate from './emailTemplate';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (userInfo) =>{
  // const accessToken= await oAuth2Client.getAccessToken() 
  // const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {

  //       type:'OAuth2',
  //       user: process.env.GMAIL_EMAIL,
  //       clientId:process.env.CLIENT_ID,
  //       clientSecret:process.env.CLIENT_SECRET,
  //       refreshToken:process.env.REFRESH_TOKEN,
  //       accessToken:accessToken,

  //     }
  //   });
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