// src/store/useWishlistStore.ts
import { create } from "zustand";
import { Product } from "@/src/types/Product";

interface WishlistStore {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const useWishlistStore = create<WishlistStore>((set, get) => ({
  wishlist: [],

  addToWishlist: (product) => {
    const { wishlist } = get();
    if (!wishlist.find((p) => p.id === product.id)) {
      set({ wishlist: [...wishlist, product] });
    }
  },

  removeFromWishlist: (id) => {
    set((state) => ({
      wishlist: state.wishlist.filter((p) => p.id !== id),
    }));
  },

  isInWishlist: (id) => {
    return get().wishlist.some((p) => p.id === id);
  },
}));

export default useWishlistStore;
