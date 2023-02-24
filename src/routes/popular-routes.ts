import express from "express";
import { getPopularSearches, getAllPopularSearches } from "../controllers/popular-controller";

const router = express.Router();

router.get("/", getPopularSearches);
router.get("/searches", getAllPopularSearches);

export default router;

