import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Error: " + error.message));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

// app.get("/check", (req: Request, res: Response) => {
//   res.json({ message: "Hello World!" });
// });

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

app.use("/api/v1/my/user", myUserRoute);
app.use("/api/v1/my/restaurant", myRestaurantRoute);
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
