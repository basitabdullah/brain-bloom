import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { connectDb } from "./libs/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
dotenv.config();
app.use("/api/auth",userRoutes)

app.get("/abyss-list", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hydrax.net/07a8dfa8fce3b110fc94797e345f83a6/list"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching from Hydrax:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
app.get("/", async (req, res) => {
  res.send("Backend is Running!")
});
connectDb();

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
