import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
const app = express();
app.use(cors());
dotenv.config();

app.get("/abyss-list", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.hydrax.net/46743d9a9db51f4fa4cc2cc28fea0795/list"
    );
    res.json(response.data);
    
  } catch (error) {
    console.error("Error fetching from Hydrax:", error.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
