import { IPopularSearch } from "../models/popular-search";
import PopularSearch from "../models/popular-search";
import { getRedbubbleData } from "./redbubble-service";
export interface GetAllParams {
  limit?: number;
  sortBy?: string;
  text?: string;
  skip?: number;
}
export const createPopularSearches = (url: string): Promise<IPopularSearch[]> => {
  return getRedbubbleData(url)
    .then((data) => {
      const trendingSearches = JSON.parse(data).data.trending_searches;

      const popularSearches: IPopularSearch[] = [];
      //drop the collection
      PopularSearch.collection.drop();
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
export async function getAll(params: GetAllParams = {}): Promise<IPopularSearch[]> {
  const { limit = 10, sortBy = "order", text, skip = 0 } = params;

  const query: Record<string, any> = {};
  if (text) {
    query.keyword = { $regex: text, $options: "i" };
  }

  let queryObj = PopularSearch.find(query).sort({ [sortBy]: "asc" });

  if (limit > -1) {
    queryObj = queryObj.skip(skip).limit(limit);
  }
  const keywords = await queryObj.exec();

  return keywords;
}

