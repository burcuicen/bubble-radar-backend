import express from "express";
import { getTrendingKeywords } from "../controllers/trending-controller";

const router = express.Router();

for (let letter of "abcdefghijklmnopqrstuvwxyz".split("")) {
  router.get(`/${letter}`, (req, res) => {
    getTrendingKeywords(req, res, letter);
  });
}

export default router;

