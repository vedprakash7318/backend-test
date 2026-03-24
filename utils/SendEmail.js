import nodemailer from "nodemailer";
import EnvData from "../config/EnvData.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "mrkhan79058@gmail.com",
        pass: "bmpp rhpi dxpe jvkq"
    }
});


export const sendEmail = async ({email, subject, message}) => {
    try {
        const info = await transporter.sendMail({
            from: EnvData.EMAIL_USER,
            to: email,
            subject: subject,
            html: message,
        });
        console.log("Email sent: " +info.messageId);

    }catch(error){
        console.log(error);

    }
}
