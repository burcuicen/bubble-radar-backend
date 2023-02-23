import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ITrendingKeyword extends Document {
  keyword: string;
  order: number;
}

const trendingSearchSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("TrendingKeyword", trendingSearchSchema);

