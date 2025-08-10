import { ArticleType, initialArticles } from "@/dummy/dummy-data";
import { create } from "zustand";

interface ArticleState {
    articles: ArticleType[];
    updateArticle: (id: string, data: Partial<ArticleType>) => void;
    deleteArticle: (id: string) => void;
    resetArticles: () => void;
}

export const useArticlesStore = create<ArticleState>((set) => ({
    articles: [...initialArticles],
    updateArticle: (id, data) =>
        set((state) => ({
            articles: state.articles.map((a) => (a.id === id ? { ...a, ...data } : a)),
        })),
    deleteArticle: (id) =>
        set((state) => ({
            articles: state.articles.filter((a) => a.id !== id),
        })),
    resetArticles: () => set({ articles: [...initialArticles] }),
}));
