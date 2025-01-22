import { create } from "zustand";

export interface WordCloudState {
  words: string[];
  setWords: (words: string[]) => void;
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
};

export const useWordCloudStore = create<WordCloudState>((set) => ({
  words: [],
  setWords: (words) => set({ words }),
  addWord: (word) => set((state) => ({ words: [...state.words, word] })),
  removeWord: (word) => set((state) => ({ words: state.words.filter((w) => w !== word) })),
}));
