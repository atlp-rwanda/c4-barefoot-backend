import nodemailer from 'nodemailer';
import 'dotenv/config';
import {google} from 'googleapis';
import emailTemplate from './emailTemplate';
const oAuth2Client=new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URL);
oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});
// const sendEmail = async (userInfo) =>{
//     const accessToken= await oAuth2Client.getAccessToken() 
//     const transporter = nodemailer.createTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         secure: true, // use SSL
//         auth: {
//           type:'loggin',
//           user: process.env.GMAIL_EMAIL,
//           pass:process.env.GMAIL_PASSWORD
//         }
//       });
//     const mailOptions = {
//       from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
//       to: userInfo.email,
//       subject: userInfo.subject,
//       html: userInfo.html
//     };
//     try {
//       const sendmail = transporter.sendMail(mailOptions);
//       return sendmail;
//     }
//     catch(err){
//        return err;;
//     }
// }
const sendEmail = async (userInfo) =>{
  const accessToken= await oAuth2Client.getAccessToken() 
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {

        type:'OAuth2',
        user: process.env.GMAIL_EMAIL,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN,
        accessToken:accessToken

      }
    });
  const mailOptions = {
    from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
    to: userInfo.email,
    subject: userInfo.subject,
    html: emailTemplate(userInfo.html)
  };
  try {
    const sendmail = transporter.sendMail(mailOptions);
    return sendmail;
  }
  catch(err){
     return err;;
  }
}
export default sendEmail;// 