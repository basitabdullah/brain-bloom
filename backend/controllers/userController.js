import User from "../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      phone,
    });

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
