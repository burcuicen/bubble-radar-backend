import { ITrendingKeyword } from "../models/trending-keyword";
import TrendingKeyword from "../models/trending-keyword";
import { getRedbubbleData } from "./redbubble-service";
export interface GetAllParams {
  limit?: number;
  sortBy?: string;
  text?: string;
  skip?: number;
  term?: string;
}

export const createTrendingKeywords = async (letter: string): Promise<ITrendingKeyword[]> => {
  const term = letter;
  const url = `https://www.redbubble.com/typeahead/?locale=en&term=${term}&limit=-1`;

  const data = await getRedbubbleData(url);
  const trendingSearches = JSON.parse(data).data.trending_searches;

  const savedKeywords: ITrendingKeyword[] = [];

  // Save the trending searches to the database
  await Promise.all(
    trendingSearches.map(async (search: any, i: number) => {
      const keyword = search.label;
      const order = i + 1;

      // Check if the keyword already exists in the database
      const existingKeyword = await TrendingKeyword.findOne({ term, keyword });

      if (existingKeyword) {
        console.log(`${existingKeyword.keyword} already exists. Skipping...`);
      } else {
        const trendingKeyword = new TrendingKeyword({ term, keyword, order });
        await trendingKeyword.save();
        savedKeywords.push(trendingKeyword);
        console.log(`Saved to database: ${keyword} (order ${order})`);
      }
    })
  );

  console.log(savedKeywords);
  return savedKeywords;
};

export async function getAll(params: GetAllParams = {}): Promise<ITrendingKeyword[]> {
  const { limit = 10, sortBy = "order", text, skip = 0, term } = params;

  const query: Record<string, any> = {};
  if (text) {
    query.keyword = { $regex: text, $options: "i" };
  }

  let queryObj = TrendingKeyword.find(query).sort({ [sortBy]: "asc" });

  if (limit > -1) {
    queryObj = queryObj.skip(skip).limit(limit);
  }
  if (term) {
    queryObj = queryObj.where("term").equals(term);
  }

  const keywords = await queryObj.exec();

  return keywords;
}

