import { ITrendingKeyword } from "../models/trending-keyword";
import TrendingKeyword from "../models/trending-keyword";
import { getRedbubbleData } from "./redbubble-service";
export interface GetAllParams {
  limit?: number;
  sortBy?: string;
  text?: string;
  skip?: number;
}

export const createTrendingKeywords = (letter: string): Promise<ITrendingKeyword[]> => {
  const term = letter;
  const url = `https://www.redbubble.com/typeahead/?locale=en&term=${term}&limit=-1`;

  return getRedbubbleData(url)
    .then((data) => {
      const trendingSearches = JSON.parse(data).data.trending_searches;

      const savedKeywords: ITrendingKeyword[] = [];

      // Save the trending searches to the database
      for (let i = 0; i < trendingSearches.length; i++) {
        const keyword = trendingSearches[i].label;
        const order = i + 1;

        // Check if the keyword already exists in the database
        TrendingKeyword.findOne({ term, keyword }, (err: any, doc: any) => {
          if (doc) console.log(doc.keyword, "already exists. Skipping...");
          if (err) {
            console.error(err);
          } else if (!doc) {
            const trendingKeyword = new TrendingKeyword({ term, keyword, order });
            trendingKeyword.save();
            savedKeywords.push(trendingKeyword);
            console.log(`Saved to database: ${keyword} (order ${order})`);
          }
        });
      }

      return savedKeywords;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Error fetching data from Redbubble API");
    });
};

export async function getAll(params: GetAllParams = {}): Promise<ITrendingKeyword[]> {
  const { limit = 10, sortBy = "order", text, skip = 0 } = params;

  const query: Record<string, any> = {};
  if (text) {
    query.keyword = { $regex: text, $options: "i" };
  }

  let queryObj = TrendingKeyword.find(query).sort({ [sortBy]: "asc" });

  if (limit > -1) {
    queryObj = queryObj.skip(skip).limit(limit);
  }

  const keywords = await queryObj.exec();

  return keywords;
}

