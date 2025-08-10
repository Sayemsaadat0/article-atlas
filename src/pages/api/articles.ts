import { ArticleType, initialArticles } from "@/dummy/dummy-data";
import type { NextApiRequest, NextApiResponse } from "next"; // Adjust path if needed

interface PaginatedResponse<T> {
  count: number;
  limit: number;
  page: number;
  data: T[];
}

function paginateArticles(
  articles: ArticleType[],
  page: number = 1,
  limit: number = 5
): PaginatedResponse<ArticleType> {
  const count = articles.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = articles.slice(start, end);

  return {
    count,
    limit,
    page,
    data,
  };
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PaginatedResponse<ArticleType>>
) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;

  const paginatedResult = paginateArticles(initialArticles, page, limit);

  // Optional: simulate delay
  setTimeout(() => {
    res.status(200).json(paginatedResult);
  }, 300);
}
