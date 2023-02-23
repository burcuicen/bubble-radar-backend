import express from "express";
import { getPopularSearches } from "../controllers/popular-controller";

const router = express.Router();

router.get("/", getPopularSearches);

export default router;

