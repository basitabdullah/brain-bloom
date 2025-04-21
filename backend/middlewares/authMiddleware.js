import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.jwtAccessToken;

    if (!token) {
      return res.status(401).json({
        message: "You are not logged In, Unauthorized!",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId, "-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized- User not found!" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
