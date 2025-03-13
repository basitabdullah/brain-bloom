import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "Please enter your phone number!"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minLength: [6, "Password must be at least 6 characters long!"],
  },

  role: {
    type: String,
    default: "user",
    required: true,
  },
});

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
  
};

const User = mongoose.model("User", userSchema);

export default User;
