import { IPopularSearch } from "../models/popular-search";
import PopularSearch from "../models/popular-search";
import { getRedbubbleData } from "./redbubble-service";

export const createPopularSearches = (url: string): Promise<IPopularSearch[]> => {
  return getRedbubbleData(url)
    .then((data) => {
      const trendingSearches = JSON.parse(data).data.trending_searches;

      const popularSearches: IPopularSearch[] = [];

      // Save the popular searches to the database
      for (let i = 0; i < trendingSearches.length; i++) {
        const keyword = trendingSearches[i].label;

        // Check if the keyword already exists in the database
        PopularSearch.findOne({ keyword }, (err: any, doc: any) => {
          if (doc) console.log(doc.keyword, "already exists. Skipping...");
          if (err) {
            console.error(err);
          } else if (!doc) {
            const popularSearch = new PopularSearch({ keyword, order: i + 1 });
            popularSearch.save();
            popularSearches.push(popularSearch);
            console.log(`Saved to database: ${keyword}`);
          }
        });
      }

      return popularSearches;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Error fetching data from Redbubble API");
    });
};

