import { ArticleType, initialArticles } from "@/dummy/dummy-data";
import { create } from "zustand";

interface ArticleState {
    articles: ArticleType[];
    updateArticle: (id: string, updatedData: Partial<ArticleType>) => void;
    deleteArticle: (id: string) => void;
    resetArticles: () => void;
}

export const useArticlesStore = create<ArticleState>((set) => ({
    articles: [...initialArticles],
    updateArticle: (id, updatedData) =>
        set((state) => ({
            articles: state.articles.map((article) =>
                article.id === id ? { ...article, ...updatedData } : article
            ),
        })),
    deleteArticle: (id) =>
        set((state) => ({
            articles: state.articles.filter((a) => a.id !== id),
        })),
    resetArticles: () => set({ articles: [...initialArticles] }),
}));
