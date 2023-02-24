import { Request, Response } from "express";
import { createPopularSearches, getAll } from "../services/popular-service";
export interface GetAllParams {
  limit?: number;
  sortBy?: string;
  text?: string;
  skip?: number;
}
export const getPopularSearches = (req: Request, res: Response): void => {
  const url = "https://www.redbubble.com/typeahead/?locale=en";

  createPopularSearches(url)
    .then((popularSearches) => {
      console.log(`Saved ${popularSearches.length} popular searches to the database`);
      res.json(popularSearches);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching data from Redbubble API");
    });
};
export async function getAllPopularSearches(req: Request, res: Response): Promise<void> {
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

