import mongoose from "mongoose";
import { Document } from "mongoose";
export type IToDoStatus = "to-do" | "in-progress" | "done";
export interface ToDo {
  status: IToDoStatus;
  title: string;
  details: string;
  estimatedTime: number;
}
export interface IMyNicheSearch extends Document {
  trendingKeywords: string[];
  createdDate: Date;
  mainTag: string;
  tags: string[];
  niche: string;
  plannedUploadCount: number;
  note?: string;
  toDoList?: ToDo[];
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
  note: {
    type: String,
    default: "",
  },
  toDoList: {
    type: [] as ToDo[],
    default: [],
  },
});

export default mongoose.model("MyNicheSearch", myNicheSearchSchema);

