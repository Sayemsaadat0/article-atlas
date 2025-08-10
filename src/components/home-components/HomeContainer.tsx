'use client'

import { useArticlesStore } from "@/store/useArticles";
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

  const [viewType, setViewType] = useState<"daily" | "monthly">("daily");
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");

  const filteredArticles = articles.filter((article: ArticleType) =>
    statusFilter === "all" ? true : article.status === statusFilter
  );

  const viewsData = aggregateMetric(filteredArticles, "views", viewType);
  const likesData = aggregateMetric(filteredArticles, "likes", viewType);
  const commentsData = aggregateMetric(filteredArticles, "comments", viewType);

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
    <div className=" spa    space-y-8">
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
    </div>
  );
};

export default HomeContainer;
