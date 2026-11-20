import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import route from "./routes/route.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

app.use("/api", route);

app.listen(port, () => {
  (connectDB(), console.log(`Server is running on port ${port}`));
});
