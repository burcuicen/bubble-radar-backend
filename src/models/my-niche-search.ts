import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IMyNicheSearch extends Document {
  trendingKeywords: string[];
  createdDate: Date;
  mainTag: string;
  tags: string[];
  niche: string;
  plannedUploadCount: number;
}
const myNicheSearchSchema = new mongoose.Schema({
  trendingKeywords: {
    type: [String],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  mainTag: {
    type: String,
  },
  tags: {
    type: [String],
  },
  niche: {
    type: String,
  },
  plannedUploadCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("MyNicheSearch", myNicheSearchSchema);

