'use client'

import { useArticlesStore } from "@/store/useArticles";
import { useAuthStore } from "@/store/useAuthStore";
import { CheckCircle, Pencil } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Interfaces (unchanged)
export interface CommentType {
  name: string;
  text: string;
  date: string;
}

export interface ArticleType {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  status: "draft" | "published";
  views: number;
  likes: number;
  content: string;
  comments: CommentType[];
}

interface AggregatedData {
  date: string;
  value: number;
}

const getCommentCount = (article: ArticleType): number => article.comments.length;

function aggregateMetric(
  articles: ArticleType[],
  metric: "views" | "likes" | "comments",
  viewType: "daily" | "monthly"
): AggregatedData[] {
  const map: Record<string, number> = {};

  articles.forEach((article) => {
    const date = new Date(article.publishedDate);
    const key =
      viewType === "daily"
        ? date.toISOString().split("T")[0]
        : date.toISOString().slice(0, 7);

    let value = 0;
    switch (metric) {
      case "views":
        value = article.views;
        break;
      case "likes":
        value = article.likes;
        break;
      case "comments":
        value = getCommentCount(article);
        break;
    }
    map[key] = (map[key] || 0) + value;
  });

  return Object.entries(map)
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, value]) => ({ date, value }));
}

const HomeContainer: React.FC = () => {
  const articles = useArticlesStore((state) => state.articles);
  const user = useAuthStore((state) => state.user)

  const [viewType, setViewType] = useState<"daily" | "monthly">("daily");
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");

  const filteredArticles = articles.filter((article: ArticleType) =>
    statusFilter === "all" ? true : article.status === statusFilter
  );

  const viewsData = aggregateMetric(filteredArticles, "views", viewType);
  const likesData = aggregateMetric(filteredArticles, "likes", viewType);
  const commentsData = aggregateMetric(filteredArticles, "comments", viewType);

  // Calculate counts
  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  const cards = [
    {
      label: "Published Articles",
      count: publishedCount,
      icon: <CheckCircle size={28} className="text-green-500" />,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      label: "Draft Articles",
      count: draftCount,
      icon: <Pencil size={28} className="text-yellow-500" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
    },
  ];
  // Sort articles by publishedDate desc and take 5
  const recentArticles = [...articles]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 5);



  const renderChart = (
    data: AggregatedData[],
    color: string,
    label: string
  ) => {
    return chartType === "line" ? (
      <LineChart
        width={700}
        height={250}
        data={data}
        margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke={color} name={label} />
      </LineChart>
    ) : (
      <BarChart
        width={700}
        height={250}
        data={data}
        margin={{ top: 20, right: 30, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill={color} name={label} />
      </BarChart>
    );
  };

  return (
    <>
      {
        user?.role === 'admin' ? <div className=" space-y-8">
          {/* Controls */}
          <div className="flex flex-wrap gap-6  justify-end">
            {/* View Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">View</label>
              <select
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={viewType}
                onChange={(e) => setViewType(e.target.value as "daily" | "monthly")}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Chart Type */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Chart Type</label>
              <select
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={chartType}
                onChange={(e) => setChartType(e.target.value as "line" | "bar")}
              >
                <option value="line">Line</option>
                <option value="bar">Bar</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Status</label>
              <select
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | "draft" | "published")
                }
              >
                <option value="all">All</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Charts */}
          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            <section className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Article Views Over Time</h3>
              <div className="overflow-auto">{renderChart(viewsData, "#6366F1", "Views")}</div>
            </section>

            <section className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-green-600">Article Likes Over Time</h3>
              <div className="overflow-auto">{renderChart(likesData, "#10B981", "Likes")}</div>
            </section>

            <section className="bg-white rounded-lg shadow p-6 lg:col-span-2">
              <h3 className="text-xl font-bold mb-4 text-yellow-500">Article Comments Over Time</h3>
              <div className="overflow-auto">{renderChart(commentsData, "#FBBF24", "Comments")}</div>
            </section>
          </div>
        </div> : <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map(({ label, count, icon, bgColor, textColor }) => (
              <div
                key={label}
                className={`flex items-center space-x-4 p-6 rounded-lg shadow-md ${bgColor}`}
              >
                <div className="p-3 rounded-full bg-white shadow">{icon}</div>
                <div>
                  <p className={`text-sm font-semibold ${textColor}`}>{label}</p>
                  <p className="text-3xl font-bold">{count}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Articles */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Articles</h2>
            <table className="w-full text-left border-collapse border">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-3 text-gray-600">Title</th>
                  <th className="py-2 px-3 text-gray-600 hidden sm:table-cell">Author</th>
                  <th className="py-2 px-3 text-gray-600 hidden md:table-cell">Published</th>
                  <th className="py-2 px-3 text-gray-600 text-center">Views</th>
                  <th className="py-2 px-3 text-gray-600 text-center">Likes</th>
                  <th className="py-2 px-3 text-gray-600 text-center">Comments</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {recentArticles.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-gray-500">
                      No articles found.
                    </td>
                  </tr>
                )}
                {recentArticles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-3 max-w-xs truncate" title={article.title}>
                      {article.title}
                    </td>
                    <td className="py-3 px-3 hidden sm:table-cell">{article.author}</td>
                    <td className="py-3 px-3 hidden md:table-cell">
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-center">{article.views}</td>
                    <td className="py-3 px-3 text-center">{article.likes}</td>
                    <td className="py-3 px-3 text-center">{article.comments.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      }
    </>
  );
};

export default HomeContainer;
