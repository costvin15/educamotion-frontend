import { create } from "zustand";

export interface WordCloudState {
  title: string;
  words: Map<string, number>;
  multipleAnswers: boolean;
  setTitle: (title: string) => void;
  setWords: (words: string[]) => void;
  setMultipleAnswers: (multipleAnswers: boolean) => void;
  addWord: (word: string) => void;
  addFrequency: (word: string, frequency: number) => void;
  removeWord: (word: string) => void;
};

export const useWordCloudStore = create<WordCloudState>((set, get) => ({
  title: '',
  words: new Map(),
  multipleAnswers: false,
  setTitle: (title) => set({ title }),
  setWords: (words) => {
    const newWords = new Map<string, number>();
    words.forEach((word) => {
      newWords.set(word, (newWords.get(word) ?? 0) + 1);
    });
    set({ words: newWords });
  },
  setMultipleAnswers: (multipleAnswers) => set({ multipleAnswers }),
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
