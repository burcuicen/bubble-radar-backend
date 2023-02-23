import mongoose from "mongoose";
import { Document } from "mongoose";

export interface IPopularSearch extends Document {
  keyword: string;
  createdDate: Date;
}
const popularSearchSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("PopularSearch", popularSearchSchema);

