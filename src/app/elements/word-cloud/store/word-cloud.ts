import { create } from "zustand";

export interface WordCloudState {
  words: Map<string, number>;
  setWords: (words: string[]) => void;
  addWord: (word: string) => void;
  addFrequency: (word: string, frequency: number) => void;
  removeWord: (word: string) => void;
};

export const useWordCloudStore = create<WordCloudState>((set, get) => ({
  words: new Map(),
  setWords: (words) => {
    const newWords = new Map<string, number>();
    words.forEach((word) => {
      newWords.set(word, (newWords.get(word) ?? 0) + 1);
    });
    set({ words: newWords });
  },
  addWord: (word) => set((state) => ({
    words: get().words.set(word, (state.words.get(word) ?? 0) + 1)
  })),
  addFrequency: (word, frequency) => set((state) => ({
    words: get().words.set(word, frequency)
  })),
  removeWord: (word) => set((state) => {
    const newWords = new Map(state.words);
    newWords.delete(word);
    return { words: newWords };
  }),
}));
