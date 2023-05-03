import mongoose from "mongoose";
import { Document } from "mongoose";
export type Status = "DEAD" | "LIVE";
export interface ITrademark extends Document {
  query: string;
  trademarkName: string;
  status: Status;
}
const trademarkSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  trademarkName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["DEAD", "LIVE"],
    required: true,
  },
});

export default mongoose.model("Trademark", trademarkSchema);

