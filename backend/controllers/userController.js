import bcrypt from "bcryptjs";
import User, { hashPassword } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateJwtToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
const setCookies = async (res, token) => {
  return new Promise((resolve, reject) => {
    try {
      res.cookie("jwtAccessToken", token, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: "None",
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User not found!",
    });
  }
  if (!user.verified) {
    res.status(500).json({
      message:
        "Unauthorized, User's Email Address Is Not Verified! Try Registering Again! ",
    });
    return await user.deleteOne();
  }

  //subscription check
  if (
    user.role === "subscriber" &&
    Date.now() > new Date(user.subscriptionEnd)
  ) {
    user.role = "user";
    await user.save();
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Incorrect email or password!",
    });
  }
  //generate token
  const token = await generateJwtToken(user._id);

  //set cookie
  await setCookies(res, token);

  res.status(201).json({
    user,
    message: "User logged in successfully!",
  });
};

export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }
    const hashedPassword = await hashPassword(password);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const token = await generateJwtToken(user._id);
    await setCookies(res, token);

    // res.cookie("jwtAccessToken", token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    //   sameSite: "None",
    // });
    res.status(200).json({
      message: "User Created Successfully!",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwtAccessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({
      message: "Logged out successfully!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "User Not Found!",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }

    const updatedFields = {
      name,
      email,
      phone,
    };

    if (password) {
      const hashedPassword = await hashPassword(password);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({
      message: "User Updated Successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while updating user:", error);
    res.status(500).json({
      message: "Something went wrong while updating the user.",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    if (password) {
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiry = undefined;
      await user.save();
    }

    res.json({ msg: "Password has been reset" });
  } catch (error) {
    console.error("Error while reseting password:", error);
    res.status(500).json({
      message: "Something went wrong while reseting password.",
    });
  }
};
