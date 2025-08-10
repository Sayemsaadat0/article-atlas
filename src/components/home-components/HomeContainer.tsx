'use client'
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Filter, Search, Calendar, ArrowUpDown } from "lucide-react";
import { useArticlesStore } from "@/store/useArticles";

export default function HomeContainer() {
    const { articles } = useArticlesStore();

    const [searchTitle, setSearchTitle] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sortBy, setSortBy] = useState("");

    // Debounced values for smoother filtering
    const debouncedSearchTitle = useDebounce(searchTitle, 400);
    const debouncedAuthorFilter = useDebounce(authorFilter, 400);

    const filteredAndSortedArticles = useMemo(() => {
        let filtered = [...articles];

        // Title search
        if (debouncedSearchTitle.trim()) {
            filtered = filtered.filter((a) =>
                a.title.toLowerCase().includes(debouncedSearchTitle.toLowerCase())
            );
        }

        // Author filter
        if (debouncedAuthorFilter.trim()) {
            filtered = filtered.filter((a) =>
                a.author.toLowerCase().includes(debouncedAuthorFilter.toLowerCase())
            );
        }

        // Date range filter
        if (startDate) {
            filtered = filtered.filter(
                (a) => new Date(a.publishedDate) >= new Date(startDate)
            );
        }
        if (endDate) {
            filtered = filtered.filter(
                (a) => new Date(a.publishedDate) <= new Date(endDate)
            );
        }

        // Sorting
        if (sortBy) {
            filtered.sort((a, b) => {
                if (sortBy === "views") return b.views - a.views;
                if (sortBy === "likes") return b.likes - a.likes;
                if (sortBy === "comments") return b.comments.length - a.comments.length;
                return 0;
            });
        }

        return filtered;
    }, [
        articles,
        debouncedSearchTitle,
        debouncedAuthorFilter,
        startDate,
        endDate,
        sortBy,
    ]);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <h1 className="text-2xl font-light text-black tracking-tight">
                        Analytics Dashboard
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Article performance overview
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">Filters</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        {/* Author Filter */}
                        <input
                            type="text"
                            placeholder="Filter by author"
                            value={authorFilter}
                            onChange={(e) => setAuthorFilter(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                        />

                        {/* Date Range */}
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                            />
                        </div>

                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="px-4 py-3 border border-gray-200 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                        />

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-none bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors appearance-none cursor-pointer"
                            >
                                <option value="">Sort by...</option>
                                <option value="views">Views</option>
                                <option value="likes">Likes</option>
                                <option value="comments">Comments</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Article
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Views
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Likes
                                    </th>
                                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Comments
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredAndSortedArticles.map((article, index) => (
                                    <tr
                                        key={article.id}
                                        className={`${index !== filteredAndSortedArticles.length - 1
                                                ? "border-b border-gray-100"
                                                : ""
                                            } hover:bg-gray-50 transition-colors`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 leading-5">
                                                {article.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {article.author}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {new Date(article.publishedDate).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    }
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="text-sm font-medium text-gray-900">
                                                {article.views.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="text-sm font-medium text-gray-900">
                                                {article.likes.toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="text-sm font-medium text-gray-900">
                                                {article.comments.length}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Empty State */}
                {filteredAndSortedArticles.length === 0 && (
                    <div className="text-center py-12 border border-gray-200 mt-4">
                        <div className="text-gray-400 text-sm">
                            No articles found matching your criteria
                        </div>
                        <div className="text-gray-300 text-xs mt-1">
                            Try adjusting your filters
                        </div>
                    </div>
                )}

                {/* Summary Stats */}
                <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
                    <div>Showing {filteredAndSortedArticles.length} articles</div>
                    <div>Last updated: {new Date().toLocaleTimeString()}</div>
                </div>
            </div>
        </div>
    );
}
