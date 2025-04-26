import nodemailer from "nodemailer";
import dotenv from "dotenv"


dotenv.config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendMail = async (req, res) => {
  const { message, email, name, phone } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.MAIL,
    subject: "BrainBloom Contact Us.",
    text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
    `,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Message sent!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      message: "Failed to send message!",
    });
  }
};
