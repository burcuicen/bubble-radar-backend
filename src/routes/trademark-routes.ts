import express from "express";
import { trademarkSearch } from "../controllers/trademark-controller";
const router = express.Router();

router.get("/", trademarkSearch);

export default router;

