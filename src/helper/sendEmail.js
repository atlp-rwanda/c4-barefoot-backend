import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendEmail = (userInfo) =>{

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        type:'loggin',
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.CLIENT_ID, 
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,   
        accessToken: process.env.ACCESS_TOKEN
      }
    });
      
      
    const mailOptions = {
      from: `"Barefoot Nomad"<${process.env.GMAIL_EMAIL}>`,
      to: userInfo.email,
      subject: userInfo.subject,
      html: userInfo.html
    };
  
    try {
      const sendmail = transporter.sendMail(mailOptions);
      return sendmail;
   
    }
    catch(err){
       return err;;
    }
}
  
export default sendEmail;