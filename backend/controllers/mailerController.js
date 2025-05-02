import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

dotenv.config();
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

export const sendConfirmationEmail = (email, confirmationToken) => {
  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: "Please confirm your email",
    html: `
      <h1>Email Confirmation</h1>
      <p>Click the link below to confirm your email:</p>
     <a href="http://localhost:5000/api/mail/confirm/${confirmationToken}">Confirm Email</a>
      `,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Confirmation email sent:", info.response);
    }
  });
};

export const confirmMail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

    // Find user by email and update verified
    await User.updateOne({ email: decoded.email }, { verified: true });

    res.send("Email confirmed successfully!");
  } catch (error) {
    res.status(400).send("Invalid or expired token");
    console.log(error);
  }
};

export const generateMailToken = async (req, res) => {
  const { email } = req.body;
  try {
    const emailToken = jwt.sign({ email }, process.env.EMAIL_SECRET, {
      expiresIn: "1hr",
    });
    sendConfirmationEmail(email, emailToken);

    const user = await User.updateOne({ email }, { emailToken });
    if (!user) {
      return res.status(500).json({
        message: "Verification Failed!",
      });
    }

    res.status(200).json({
      message: "Verification email sent to you email successfully!",
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
