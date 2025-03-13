import mongoose from "mongoose";

export const connectDb = async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.log("Error Connecting To Database!");
  }
};
