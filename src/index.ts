import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import myUserRoute from "./routes/MyUserRoute";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.log("Error: " + error.message));

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
app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
