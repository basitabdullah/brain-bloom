import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import crypto from "crypto"

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
    from: "info.brainbloom@gmail.com",
    to: email,
    subject: "Please confirm your email",
    html: `
      <h1>Email Confirmation</h1>
      <p>Click the link below to confirm your email:</p>
     <a href="https://brainbloom.sbs/api/mail/confirm/${confirmationToken}">Confirm Email</a>
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

const sendResetMail = async (to, token) => {
  const subject = "Reset Your Password";
  const resetLink = `${process.env.CLIENT_URL}#/reset-password/${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Password Reset Request</h2>
      <p style="color: #555;">
        Hi there,<br><br>
        You recently requested to reset your password. Click the button below to proceed:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" 
           style="background-color: #007bff; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>
      <p style="color: #777;">
        This link will expire in 1 hour.<br><br>
        If you didn’t request a password reset, you can safely ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #ddd;" />
      <p style="color: #aaa; font-size: 12px;">
        &copy; ${new Date().getFullYear()} BrainBloom. All rights reserved.
      </p>
    </div>
  `;
  await transporter.sendMail({
    from: "info.brainbloom@gmail.com",
    to,
    subject,
    html,
  });
};



export const sendPasswordResetMail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const now = Date.now();

    // Check if previous reset was sent less than 60 seconds ago
    if (user.resetTokenExpiry && user.resetTokenExpiry - 3600000 + 60000 > now) {
      return res
        .status(429)
        .json({ message: 'Please wait 60 seconds before requesting again.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = now + 3600000; // 1 hour expiry
    await user.save();

    await sendResetMail(email, token);
    res.json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

