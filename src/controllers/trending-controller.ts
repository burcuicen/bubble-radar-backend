import { Request, Response } from "express";
import { createTrendingKeywords } from "../services/trending-service";

export const getTrendingKeywords = (req: Request, res: Response, letter: string) => {
  const term = letter;
  const keywords = createTrendingKeywords(term);

  keywords
    .then((savedKeywords) => {
      console.log(`Saved ${savedKeywords.length} trending keywords for term '${term}'`);
      res.json(savedKeywords);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving trending keywords to the database");
    });
};

