import { Request, Response } from "express";
import { createTrendingKeywords, getAll, GetAllParams } from "../services/trending-service";

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

export async function getAllTrendingKeywords(req: Request, res: Response): Promise<void> {
  try {
    const { limit, sortBy, text, skip } = req.query;

    const params: GetAllParams = {
      limit: typeof limit === "string" ? parseInt(limit, 10) : undefined,
      sortBy: typeof sortBy === "string" ? sortBy : undefined,
      text: typeof text === "string" ? text : undefined,
      skip: typeof skip === "string" ? parseInt(skip, 10) : undefined,
    };

    const keywords = await getAll(params);
    res.json(keywords);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching trending keywords");
  }
}

