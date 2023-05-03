import { Request, Response } from "express";
import { getTmHuntData } from "../services/tmhunt-service";

interface TrademarkReport {
  trademarkName: string;
  query: string;
  trademarkStatus: string;
}

export async function trademarkSearch(req: Request, res: Response) {
  try {
    const searchText = req.query.text as string;
    const searchTerms = searchText.split(",");
    const results: TrademarkReport[] = [];

    await Promise.all(
      searchTerms.map(async (term) => {
        const tmData = await getTmHuntData(term);

        tmData.forEach((item: any) => {
          const trademarkReport: TrademarkReport = {
            trademarkName: item[1],
            query: term,
            trademarkStatus: item[2],
          };

          const existingTrademark = results.find((result) => result.trademarkName === trademarkReport.trademarkName && result.trademarkStatus === trademarkReport.trademarkStatus);

          if (!existingTrademark) {
            results.push(trademarkReport);
          }
        });
      })
    );

    res.status(200).json(results);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
