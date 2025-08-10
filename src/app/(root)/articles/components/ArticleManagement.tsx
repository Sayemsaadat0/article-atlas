'use client'
import { useState, useMemo } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Calendar, ArrowUpDown } from "lucide-react";
import { useArticlesStore } from "@/store/useArticles";
import ArticleEditForm from "@/app/(root)/articles/components/ArticleEditForm";
import DeleteAction from "@/components/core/DeleteAction";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthStore } from "@/store/useAuthStore";

function DateRangePicker({ onChange }: { onChange: (dates: [Date | null, Date | null]) => void }) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const handleChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        onChange(dates);
    };

    return (
        <div className="relative w-full max-w-xs">
            <DatePicker
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                placeholderText="Select date range"
                className="w-full pl-9 pr-3 py-2 border bg-white border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-black text-gray-900"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
    );
}




// Default Componnent
const ArticleManagement = () => {
    const { articles, deleteArticle } = useArticlesStore();
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const debouncedSearchQuery = useDebounce(searchQuery, 400);

    const filteredAndSortedArticles = useMemo(() => {
        let filtered = [...articles];

        if (dateRange[0] && dateRange[1]) {
            filtered = filtered.filter((a) => {
                const pubDate = new Date(a.publishedDate);
                return pubDate >= dateRange[0]! && pubDate <= dateRange[1]!;
            });
        }

        if (debouncedSearchQuery.trim()) {
            const lowerQuery = debouncedSearchQuery.toLowerCase();
            filtered = filtered.filter(
                (a) =>
                    a.title.toLowerCase().includes(lowerQuery) ||
                    a.author.toLowerCase().includes(lowerQuery)
            );
        }

        if (sortBy) {
            filtered.sort((a, b) => {
                if (sortBy === "views") return b.views - a.views;
                if (sortBy === "likes") return b.likes - a.likes;
                if (sortBy === "comments") return b.comments.length - a.comments.length;
                return 0;
            });
        }

        return filtered;
    }, [articles, debouncedSearchQuery, dateRange, sortBy]);

    const user = useAuthStore((state) => state.user)

    return (
        <div className="min-h-screen">
            <div>
                <h1 className="text-2xl font-light text-black tracking-tight">
                    Articles
                </h1>
            </div>

            {/* Main Content */}
            <div className="py-8">
                {/* Filters Section */}
                <div className="mb-2">

                    <div className="flex justify-between items-center gap-3">
                        {/* Search Input */}
                        <div className="relative col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title or author..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-gray-400 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition"
                            />
                        </div>

                        <div className="grid grid-cols-2  gap-2">
                            {/* Date Range Picker */}
                            <DateRangePicker onChange={setDateRange} />

                            {/* Sort Dropdown */}
                            <div className="relative">
                                <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full  pl-9 pr-3 py-2 border border-gray-400 bg-white rounded-md  text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition appearance-none cursor-pointer"
                                >
                                    <option className="text-gray-400" value="">Sort by...</option>
                                    <option value="views">Views</option>
                                    <option value="likes">Likes</option>
                                    <option value="comments">Comments</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-200">
                                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">Article</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">Author</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">Published</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-4 py-2 text-left font-medium text-gray-700 uppercase tracking-wider">Content</th>
                                    <th className="px-4 py-2 text-right font-medium text-gray-700 uppercase tracking-wider">Views</th>
                                    <th className="px-4 py-2 text-right font-medium text-gray-700 uppercase tracking-wider">Likes</th>
                                    <th className="px-4 py-2 text-right font-medium text-gray-700 uppercase tracking-wider">Comments</th>
                                    <th className="px-4 py-2 text-center font-medium text-gray-700 uppercase tracking-wider">Action</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white shadow">
                                {filteredAndSortedArticles.map((article, index) => (
                                    <tr
                                        key={article.id}
                                        className={`${index !== filteredAndSortedArticles.length - 1 ? "border-b border-gray-100" : ""
                                            } hover:bg-gray-50 transition-colors`}
                                    >
                                        <td className="px-4 py-2 font-medium text-gray-900">{article.title}</td>
                                        <td className="px-4 py-2 text-gray-600">{article.author}</td>
                                        <td className="px-4 py-2 text-gray-600">
                                            {new Date(article.publishedDate).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${article.status === "published" ?
                                                    "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {article.status === "published" ? "Published" : "Draft"}

                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 max-w-[200px] truncate">
                                            {article.content}
                                        </td>
                                        <td className="px-4 py-2 text-right font-medium text-gray-900">
                                            {article.views.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 text-right font-medium text-gray-900">
                                            {article.likes.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 text-center font-medium text-gray-900">
                                            {article.comments.length}
                                        </td>

                                        <td className="px-2 py-2 flex items-center justify-center gap-2">
                                            <ArticleEditForm articleId={article.id} />
                                            {
                                                user?.role === 'admin' && <DeleteAction
                                                    isOnlyIcon
                                                    handleDeleteSubmit={() => deleteArticle(article.id)}
                                                />
                                            }

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
                        <div className="text-gray-400 text-xs mt-1">
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
};

export default ArticleManagement;
