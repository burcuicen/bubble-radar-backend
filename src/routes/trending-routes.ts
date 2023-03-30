import express from "express";
import { getTrendingKeywords, getAllTrendingKeywords, populateDatabaseController } from "../controllers/trending-controller";

const router = express.Router();

for (let letter of "abcdefghijklmnopqrstuvwxyz".split("")) {
  router.get(`/${letter}`, (req, res) => {
    getTrendingKeywords(req, res, letter);
  });
}
router.get("/keywords", getAllTrendingKeywords);

router.get("/populate", populateDatabaseController);

export default router;

