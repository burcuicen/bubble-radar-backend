import { Request, Response } from "express";
import { createPopularSearches } from "../services/popular-service";

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

