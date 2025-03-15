import bcrypt from "bcryptjs";
import User, { hashPassword } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const generateJwtToken = async (userId) => {
  try {
    const token = jwt.sign({ userId }, "vjdvjbsdv", {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    console.log(error.message);
  }
};
const setCookies = async (res, token) => {
  try {
    res.cookie("jwtAccessToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      sameSite: "None",
    });
  } catch (error) {}
};

export const login = async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    return res.status(401).json({
      message: "User not found!",
    });
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
  setCookies(res, token);

  res.status(201).json({
    message: "User logged in successfully!",
    user,
  });
};

export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
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
    const token = generateJwtToken(user._id);

    // res.cookie("jwtAccessToken", token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    //   sameSite: "None",
    // });
    //instaed of this you can make a function
    setCookies(res, token);
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