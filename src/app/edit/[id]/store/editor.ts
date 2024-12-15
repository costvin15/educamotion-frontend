import { create } from 'zustand';

import { Page } from '@/app/edit/[id]/types/pages';

interface EditorState {
  presentationId: string;
  slides: Page[];
  thumbnails: { [key: string]: string };
  currentSlideIndex: number;
  setPresentationId: (id: string) => void;
  addSlides: (slides: Page[]) => void;
  addThumbnail: (slideId: string, thumbnail: string) => void;
  setCurrentSlide: (index: number) => void;
  reset: () => void;
}

const initialState: Page = {
  objectId: '',
};

export const useEditorStore = create<EditorState>((set) => ({
  presentationId: '',
  slides: [initialState],
  thumbnails: {},
  currentSlideIndex: 0,
  setPresentationId: (id) => set((state) => ({ presentationId: id })),
  addSlides: (slides) => set((state) => ({ slides: slides })),
  addThumbnail: (slideId, thumbnail) => set((state) => ({ thumbnails: { ...state.thumbnails, [slideId]: thumbnail } })),
  setCurrentSlide: (index) => set((state) => ({ currentSlideIndex: index })),
  reset: () => set((state) => ({ presentationId: '', slides: [initialState], thumbnails: {}, currentSlideIndex: 0 })),
}));
