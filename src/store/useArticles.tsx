import { ArticleType, initialArticles } from "@/dummy/dummy-data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArticleState {
  articles: ArticleType[];
  updateArticle: (id: string, updatedData: Partial<ArticleType>) => void;
  deleteArticle: (id: string) => void;
  resetArticles: () => void;
}

export const useArticlesStore = create<ArticleState>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
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
    }),
    {
      name: "articles-storage", // key in localStorage
      // Optionally, serialize/deserialize functions if needed
      // getStorage: () => localStorage, // default
    }
  )
);
