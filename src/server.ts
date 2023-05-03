import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import trendingRouter from "./routes/trending-routes";
import popularRouter from "./routes/popular-routes";
import nicheSearchRouter from "./routes/niche-search-routes";
import trademarkRouter from "./routes/trademark-routes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const mongodbUri = process.env.MONGODB_URI;
// enable CORS for all routes
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
  next();
});

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
app.use("/my-niche-search", nicheSearchRouter);
app.use("/trademark", trademarkRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});

