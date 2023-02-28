import { IMyNicheSearch } from "../models/my-niche-search";
import MyNicheSearch from "../models/my-niche-search";
export interface GetAllParams {
  limit?: number;
  sortBy?: string;
  text?: string;
  skip?: number;
}
export async function getAll(params: GetAllParams = {}): Promise<IMyNicheSearch[]> {
  const { limit = 10, sortBy = "-createdDate", text, skip = 0 } = params;

  const query: Record<string, any> = {};
  if (text) {
    query.$or = [{ trendingKeywords: { $regex: text, $options: "i" } }, { mainTag: { $regex: text, $options: "i" } }, { tags: { $regex: text, $options: "i" } }, { niche: { $regex: text, $options: "i" } }];
  }

  const results = await MyNicheSearch.find(query).sort(sortBy).skip(skip).limit(limit).lean();

  return results as IMyNicheSearch[];
}
export async function getById(id: string): Promise<IMyNicheSearch | null> {
  const result = await MyNicheSearch.findById(id).lean();
  return result as IMyNicheSearch;
}
export async function create(data: IMyNicheSearch): Promise<IMyNicheSearch> {
  const result = await MyNicheSearch.create(data);
  console.log(data);
  return result as IMyNicheSearch;
}
export async function updateById(id: string, data: Partial<IMyNicheSearch>): Promise<IMyNicheSearch | null> {
  const result = await MyNicheSearch.findByIdAndUpdate(id, data, { new: true }).lean();
  return result as IMyNicheSearch;
}
export async function deleteById(id: string): Promise<IMyNicheSearch | null> {
  const result = await MyNicheSearch.findByIdAndDelete(id).lean();
  return result as IMyNicheSearch;
}

