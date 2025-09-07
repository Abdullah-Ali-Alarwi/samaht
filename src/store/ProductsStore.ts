import { create } from "zustand"; // ← هذا ضروري
import { Product } from "@/src/types/Product";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  fetchProducts: () => void;
  getFilteredProducts: () => Product[];
}

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      set({ products: data.products, loading: false });
    } catch {
      set({ error: "Failed to fetch products", loading: false });
    }
  },
  getFilteredProducts: () => {
    const { products, searchQuery, selectedCategory } = get();
    return products.filter((p) => {
      const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
      return matchesQuery && matchesCategory;
    });
  },
}));

export default useProductStore;
