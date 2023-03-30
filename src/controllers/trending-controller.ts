import { Request, Response } from "express";
import { createTrendingKeywords, getAll, GetAllParams, populateDatabase } from "../services/trending-service";

export const getTrendingKeywords = (req: Request, res: Response, letter: string) => {
  const term = letter;
  const keywords = createTrendingKeywords(term);

  keywords
    .then((keywords) => {
      console.log(`Saved ${keywords.length} trending keywords for term '${term}'`);
      res.setHeader("Access-Control-Allow-Origin", "*");
      console.log(keywords, "controller");
      res.json(keywords);
    })
    .catch((error) => {
      console.error(error);
      res.setHeader("Access-Control-Allow-Origin", "*");

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
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.json(keywords);
  } catch (error) {
    console.error(error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).send("Error fetching trending keywords");
  }
}
export async function populateDatabaseController(req: Request, res: Response): Promise<void> {
  try {
    await populateDatabase();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send("Successfully populated the database with trending keywords");
  } catch (error) {
    console.error(error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).send("Error populating the database with trending keywords");
  }
}

