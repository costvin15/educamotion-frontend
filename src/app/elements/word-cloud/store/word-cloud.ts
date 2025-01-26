import { create } from "zustand";

import { WordCloud } from "@/app/elements/word-cloud/types";
import { Datum } from "@/components/ui/WordCloud";

export interface DatumState {
  datum: Map<string, number>;
}

export interface WordCloudState {
  wordClouds: Map<string, WordCloud>;
  words: Map<string, DatumState>;
  addWordCloud: (wordCloud: WordCloud) => void;
  addWord: (id: string, word: string) => void;
  addFrequency: (id: string, word: string, frequency: number) => void;
  setWordCloud: (wordCloud: WordCloud) => void;
};

export const useWordCloudStore = create<WordCloudState>((set, get) => ({
  wordClouds: new Map<string, WordCloud>(),
  words: new Map<string, DatumState>(),
  addWordCloud: (wordCloud) => set((state) => {
    const clouds = state.wordClouds;
    clouds.set(wordCloud.id, wordCloud);
    return { wordClouds: clouds };
  }),
  addWord: (id, word) => set((state) => {
    const words = state.words.get(id) ?? { datum: new Map() };
    if (words.datum.has(word) && !get().wordClouds.get(id)?.enableMultipleEntries) {
      // TODO: How to deal with this?
      return state;
    }
    const datum = words.datum;
    const count = datum.get(word) ?? 0;
    datum.set(word, count + 1);
    return { words: state.words.set(id, { datum }) };
  }),
  addFrequency: (id, word, frequency) => set((state) => {
    const words = state.words.get(id) ?? { datum: new Map() };
    const datum = words.datum;
    datum.set(word, frequency);
    const result = state.words.set(id, { datum });
    return { words: result };
  }),
  setWordCloud: (wordCloud) => set((state) => {
    const clouds = state.wordClouds;
    clouds.set(wordCloud.id, wordCloud);
    return { wordClouds: clouds };
  }),
}));
