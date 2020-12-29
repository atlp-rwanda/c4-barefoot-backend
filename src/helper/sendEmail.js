import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendEmail = (userInfo) =>{

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD
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