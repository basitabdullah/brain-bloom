import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { connectDb } from "./libs/connectDb.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import subscribeRoutes from "./routes/subscribeRoutes.js";
import mailerRoutes from "./routes/mailerRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
dotenv.config();

const corsOptions = {
  origin: ["https://www.brainbloom.sbs", "http://localhost:5173"], // Allow requests from the React app
  methods: "GET,POST,PUT,DELETE,PATCH", // Allow these HTTP methods
  credentials: true, // Enable credentials (cookies, auth headers)
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/course" ,courseRoutes)
app.use("/api/subscribe" ,subscribeRoutes)
app.use("/api/mail" ,mailerRoutes)

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
app.get("/", (req, res) => {
  res.send("Backend is Running!");
});

app.listen(process.env.PORT, () => {
  connectDb();
  console.log(`Listening on port ${process.env.PORT}`);
});
