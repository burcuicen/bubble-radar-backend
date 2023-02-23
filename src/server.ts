import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import trendingRouter from "./routes/trending-routes";
import popularRouter from "./routes/popular-routes";

dotenv.config();

const app = express();
const mongodbUri = process.env.MONGODB_URI;

if (mongodbUri) {
  mongoose
    .connect(mongodbUri, {})
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error("MONGODB_URI environment variable not defined");
}

app.use("/trending", trendingRouter);
app.use("/popular", popularRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

