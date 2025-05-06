import { create } from 'zustand';

type ProductStore = {
  sortBy: 'price' | 'name';
  filters: {
    minPrice: number;
    maxPrice: number;
    sizes: number[];
    colors: string[];
  };
  setSort: (by: 'price' | 'name') => void;
  setFilters: (filters: Partial<ProductStore['filters']>) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  sortBy: 'price',
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    sizes: [],
    colors: []
  },
  setSort: (by) => set({ sortBy: by }),
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
}));